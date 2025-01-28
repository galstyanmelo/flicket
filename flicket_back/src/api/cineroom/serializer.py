from rest_framework import serializers
from .models import Cineroom


class CineroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cineroom
        fields = ('name', 'id')
