from django.urls import path
from .views import ActivityRecordDetailAPIView
from .views import (
    ActivityRecordListAPIView,
    ApproveActivityAPIView,
    RejectActivityAPIView,
    ActivityRecordDetailAPIView,
)

urlpatterns = [

    path(
        "activity-records/",
        ActivityRecordListAPIView.as_view(),
    ),

    path(
        "activity-records/<int:pk>/approve/",
        ApproveActivityAPIView.as_view(),
    ),

    path(
        "activity-records/<int:pk>/reject/",
        RejectActivityAPIView.as_view(),
    ),
    path(
    "activity-records/<int:pk>/",
    ActivityRecordDetailAPIView.as_view(),
),
]