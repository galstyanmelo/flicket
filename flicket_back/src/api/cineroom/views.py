from django.utils.decorators import method_decorator
from rest_framework.generics import ListAPIView

from src.api.cineroom.models import Cineroom
from src.api.cineroom.serializer import CineroomSerializer
from src.api.cineroom import schemas as docs


@method_decorator(**docs.cinrooms_list)
class CinroomsListView(ListAPIView):
    serializer_class = CineroomSerializer
    queryset = Cineroom.objects.all()
