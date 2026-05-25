from django.db import models
from normalization.models import ActivityRecord


class ValidationIssue(models.Model):
    SEVERITY = [
        ("WARNING", "WARNING"),
        ("ERROR", "ERROR"),
    ]

    activity_record = models.ForeignKey(
        ActivityRecord,
        on_delete=models.CASCADE,
        related_name="issues"
    )

    severity = models.CharField(
        max_length=50,
        choices=SEVERITY
    )

    field_name = models.CharField(max_length=255)

    message = models.TextField()

    resolved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)