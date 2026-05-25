from rest_framework import serializers

from .models import ActivityRecord

from review.models import ValidationIssue


class ValidationIssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = ValidationIssue
        fields = "__all__"


class ActivityRecordSerializer(serializers.ModelSerializer):

    issues = ValidationIssueSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = ActivityRecord

        fields = "__all__"


class ActivityRecordDetailSerializer(serializers.ModelSerializer):

    issues = ValidationIssueSerializer(
        many=True,
        read_only=True
    )

    raw_record = serializers.SerializerMethodField()

    class Meta:
        model = ActivityRecord

        fields = [
            "id",
            "category",
            "scope",
            "activity_type",
            "quantity",
            "review_status",
            "issues",
            "raw_record",
        ]

    def get_raw_record(self, obj):

        return {
            "source_row_number": obj.raw_record.source_row_number,
            "raw_payload": obj.raw_record.raw_payload,
        }