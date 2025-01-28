from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from rest_framework import status

from src.api.order.models import Timetable
from src.api.order.serializer import TimetableSerializer
from src.api.order import schemas as docs


@method_decorator(**docs.movie_timetables_list)
class MovieTimetablesView(APIView):
    def get(self, request, movie_id):
        try:
            timetables = Timetable.objects.filter(movie_id=movie_id)
            serializer = TimetableSerializer(timetables, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Timetable.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
