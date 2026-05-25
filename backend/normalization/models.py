from django.db import models
from tenants.models import Tenant
from ingestion.models import RawRecord


class ActivityRecord(models.Model):
    REVIEW_STATUS = [
        ("PENDING", "PENDING"),
        ("APPROVED", "APPROVED"),
        ("REJECTED", "REJECTED"),
    ]

    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE
    )

    raw_record = models.ForeignKey(
        RawRecord,
        on_delete=models.CASCADE
    )

    category = models.CharField(max_length=100)

    scope = models.CharField(max_length=20)

    activity_type = models.CharField(max_length=100)

    activity_date = models.DateField(
        null=True,
        blank=True
    )

    quantity = models.FloatField(default=0)

    source_unit = models.CharField(max_length=50)

    normalized_unit = models.CharField(max_length=50)

    facility = models.CharField(
        max_length=255,
        blank=True
    )

    review_status = models.CharField(
        max_length=50,
        choices=REVIEW_STATUS,
        default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)