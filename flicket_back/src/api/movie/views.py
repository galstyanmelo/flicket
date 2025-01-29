from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from django.utils.decorators import method_decorator
from django_filters import rest_framework as filters
from rest_framework.generics import ListAPIView

from src.api.movie.models import Movie
from src.api.movie.serializer import MovieSerializer
from src.api.movie import schemas as docs


class MoviesFilter(filters.FilterSet):
    cineroom_id = filters.NumberFilter(field_name='cineroom__id', lookup_expr='exact')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')


@method_decorator(**docs.movies_list)
class MoviesSearchView(ListAPIView):
    serializer_class = MovieSerializer
    filter_backends = (DjangoFilterBackend,)
    pagination_class = LimitOffsetPagination
    filterset_class = MoviesFilter
    queryset = Movie.objects.all()
