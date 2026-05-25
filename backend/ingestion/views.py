from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from .serializers import UploadSerializer
from .services import process_upload


class UploadAPIView(GenericAPIView):

    serializer_class = UploadSerializer

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def post(self, request):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            result = process_upload(
                file=serializer.validated_data["file"],
                tenant_id=serializer.validated_data["tenant_id"],
                source_type=serializer.validated_data["source_type"],
            )

            return Response(result)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )