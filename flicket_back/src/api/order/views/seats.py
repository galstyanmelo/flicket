from rest_framework import generics
from src.api.order.models import Seat
from src.api.order.serializer import SeatSerializer


class SeatListView(generics.ListAPIView):
    serializer_class = SeatSerializer

    def get_queryset(self):
        timetable_id = self.kwargs['timetable_id']
        return Seat.objects.filter(timetable_id=timetable_id)
