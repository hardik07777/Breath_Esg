from rest_framework import serializers


class UploadSerializer(serializers.Serializer):
    tenant_id = serializers.IntegerField()
    source_type = serializers.CharField()
    file = serializers.FileField()