import pandas as pd

from ingestion.models import (
    DataSource,
    UploadBatch,
    RawRecord,
)

from normalization.models import ActivityRecord

from review.models import ValidationIssue

from tenants.models import Tenant


def normalize_unit(unit):
    mapping = {
        "L": "liters",
        "GAL": "liters",
        "KWH": "kwh",
    }

    return mapping.get(str(unit).upper(), "unknown")


def determine_scope(source_type):

    if source_type == "SAP":
        return "Scope 1"

    if source_type == "UTILITY":
        return "Scope 2"

    return "Scope 3"

def map_sap_row(row):

    return {
        "category": "Fuel",
        "activity_type": row.get(
            "Material Description",
            "Unknown"
        ),
        "quantity": row.get("Qty", 0),
        "unit": row.get("UOM", ""),
        "facility": row.get("Plant Code", ""),
    }


def map_utility_row(row):

    return {
        "category": "Electricity",
        "activity_type": row.get(
            "Meter Name",
            "Electricity Usage"
        ),
        "quantity": row.get(
            "Consumption kWh",
            0
        ),
        "unit": "KWH",
        "facility": row.get(
            "Facility",
            "Unknown"
        ),
    }


def map_travel_row(row):

    return {
        "category": "Travel",
        "activity_type": row.get(
            "Trip Type",
            "Travel"
        ),
        "quantity": row.get(
            "Distance KM",
            0
        ),
        "unit": "KM",
        "facility": "Corporate",
    }

def process_upload(file, tenant_id, source_type):

    tenant = Tenant.objects.get(id=tenant_id)

    source, _ = DataSource.objects.get_or_create(
        tenant=tenant,
        type=source_type,
        defaults={
            "name": f"{source_type} Source"
        }
    )

    batch = UploadBatch.objects.create(
        tenant=tenant,
        source=source,
        file_name=file.name,
        ingestion_status="PROCESSING",
    )

    df = pd.read_csv(file)

    batch.total_rows = len(df)

    success_count = 0
    failed_count = 0
    validation_issues_count = 0

    for index, row in df.iterrows():

        # PRESERVE ORIGINAL RAW ROW
        original_row = row.fillna("").to_dict()

        # SOURCE-SPECIFIC NORMALIZATION

        if source_type == "SAP":

            mapped = map_sap_row(row)

        elif source_type == "UTILITY":

            mapped = map_utility_row(row)

        else:

            mapped = map_travel_row(row)

        raw_record = RawRecord.objects.create(
            batch=batch,
            source_row_number=index + 1,
            raw_payload=original_row,
        )

        normalized_unit = normalize_unit(
            mapped.get("unit", "")
        )

        activity = ActivityRecord.objects.create(
            tenant=tenant,
            raw_record=raw_record,
            category=mapped.get("category", "Unknown"),
            scope=determine_scope(source_type),
            activity_type=mapped.get(
                "activity_type",
                "Unknown"
            ),
            quantity=mapped.get("quantity", 0),
            source_unit=mapped.get("unit", ""),
            normalized_unit=normalized_unit,
            facility=mapped.get("facility", ""),
        )

        # UNKNOWN UNIT VALIDATION

        if normalized_unit == "unknown":

            ValidationIssue.objects.create(
                activity_record=activity,
                severity="WARNING",
                field_name="unit",
                message="Unknown unit detected",
            )

            validation_issues_count += 1

        # NEGATIVE QUANTITY VALIDATION

        if float(mapped.get("quantity", 0)) < 0:

            ValidationIssue.objects.create(
                activity_record=activity,
                severity="HIGH",
                field_name="quantity",
                message="Negative quantity detected",
            )

            validation_issues_count += 1

        # MISSING FACILITY VALIDATION

        if not mapped.get("facility"):

            ValidationIssue.objects.create(
                activity_record=activity,
                severity="MEDIUM",
                field_name="facility",
                message="Facility missing",
            )

            validation_issues_count += 1

        # SUSPICIOUSLY LARGE VALUE VALIDATION

        if float(mapped.get("quantity", 0)) > 100000:

            ValidationIssue.objects.create(
                activity_record=activity,
                severity="WARNING",
                field_name="quantity",
                message="Suspiciously large quantity",
            )

            validation_issues_count += 1

        success_count += 1

    batch.success_rows = success_count
    batch.failed_rows = failed_count
    batch.ingestion_status = "COMPLETED"

    batch.save()

    return {
        "batch_id": batch.id,
        "rows_processed": batch.total_rows,
        "records_created": success_count,
        "failed_rows": failed_count,
        "validation_issues": validation_issues_count,
    }