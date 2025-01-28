from rest_framework import generics
from src.api.order.models import Seat
from src.api.order.serializer import SeatSerializer
from rest_framework.response import Response
from rest_framework import status


class SeatCreateView(generics.CreateAPIView):
    serializer_class = SeatSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)

        if serializer.is_valid():
            seats = serializer.save()
            return Response(SeatSerializer(seats, many=True).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
