from rest_framework import serializers
from src.api.order.models import Timetable


class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = ['id', 'date', 'start_time', 'end_time', 'price']
