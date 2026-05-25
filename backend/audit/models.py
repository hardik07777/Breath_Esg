from django.db import models


class AuditLog(models.Model):
    entity_type = models.CharField(max_length=100)

    entity_id = models.IntegerField()

    action = models.CharField(max_length=100)

    previous_value = models.JSONField(
        null=True,
        blank=True
    )

    new_value = models.JSONField(
        null=True,
        blank=True
    )

    actor = models.CharField(
        max_length=255,
        blank=True
    )

    timestamp = models.DateTimeField(auto_now_add=True)