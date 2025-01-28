from django.urls import path

from . import views as auth

urlpatterns = [
    path('', auth.MoviesSearchView.as_view(), name='movies-search'),
]
