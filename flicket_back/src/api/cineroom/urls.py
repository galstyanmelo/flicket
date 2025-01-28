from django.urls import path

from . import views as auth

urlpatterns = [
    path('', auth.CinroomsListView.as_view(), name='cinrooms-list'),
]
