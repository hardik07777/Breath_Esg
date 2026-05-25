from django.db import models
from tenants.models import Tenant


class DataSource(models.Model):
    SOURCE_TYPES = [
        ("SAP", "SAP"),
        ("UTILITY", "UTILITY"),
        ("TRAVEL", "TRAVEL"),
    ]

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)

    type = models.CharField(max_length=50, choices=SOURCE_TYPES)

    name = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)


class UploadBatch(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "PENDING"),
        ("PROCESSING", "PROCESSING"),
        ("COMPLETED", "COMPLETED"),
        ("FAILED", "FAILED"),
    ]

    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    file_name = models.CharField(max_length=255)

    ingestion_status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    total_rows = models.IntegerField(default=0)

    success_rows = models.IntegerField(default=0)

    failed_rows = models.IntegerField(default=0)

    uploaded_at = models.DateTimeField(auto_now_add=True)


class RawRecord(models.Model):
    PARSE_STATUS = [
        ("VALID", "VALID"),
        ("FAILED", "FAILED"),
    ]

    batch = models.ForeignKey(
        UploadBatch,
        on_delete=models.CASCADE
    )

    source_row_number = models.IntegerField()

    raw_payload = models.JSONField()

    parse_status = models.CharField(
        max_length=50,
        choices=PARSE_STATUS,
        default="VALID"
    )

    parse_errors = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)