from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ActivityRecord

from .serializers import (
    ActivityRecordSerializer,
    ActivityRecordDetailSerializer,
)

from audit.models import AuditLog


class ActivityRecordListAPIView(APIView):

    def get(self, request):

        status_filter = request.GET.get("status")

        queryset = ActivityRecord.objects.all()

        if status_filter:
            queryset = queryset.filter(
                review_status=status_filter
            )

        serializer = ActivityRecordSerializer(
            queryset,
            many=True
        )

        return Response(serializer.data)


class ActivityRecordDetailAPIView(APIView):

    def get(self, request, pk):

        activity = ActivityRecord.objects.get(id=pk)

        serializer = ActivityRecordDetailSerializer(
            activity
        )

        return Response(serializer.data)


class ApproveActivityAPIView(APIView):

    def post(self, request, pk):

        activity = ActivityRecord.objects.get(id=pk)

        previous_status = activity.review_status

        activity.review_status = "APPROVED"

        activity.save()

        AuditLog.objects.create(
            entity_type="ActivityRecord",
            entity_id=activity.id,
            action="APPROVED",
            previous_value={
                "review_status": previous_status
            },
            new_value={
                "review_status": "APPROVED"
            },
            actor="analyst"
        )

        return Response({
            "message": "Record approved"
        })


class RejectActivityAPIView(APIView):

    def post(self, request, pk):

        activity = ActivityRecord.objects.get(id=pk)

        previous_status = activity.review_status

        activity.review_status = "REJECTED"

        activity.save()

        AuditLog.objects.create(
            entity_type="ActivityRecord",
            entity_id=activity.id,
            action="REJECTED",
            previous_value={
                "review_status": previous_status
            },
            new_value={
                "review_status": "REJECTED"
            },
            actor="analyst"
        )

        return Response({
            "message": "Record rejected"
        })