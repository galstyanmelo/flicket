from django.urls import path

from . import views as auth

urlpatterns = [
    path('movies/<int:movie_id>/timetables/', auth.MovieTimetablesView.as_view(), name='movies-timetables'),
    path('seats/create/', auth.SeatCreateView.as_view(), name='create-seat'),
    path('seats/timetable/<int:timetable_id>/', auth.SeatListView.as_view(), name='seats-list'),
]
