from rest_framework import serializers
from src.api.order.models import Seat


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['timetable', 'row', 'column']