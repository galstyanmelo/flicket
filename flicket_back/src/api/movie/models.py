from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel
from datetime import datetime
from django.db import models

from .enums import MovieGenre


class Movie(TimeStampedModel):
    title = models.CharField(_('Title'), max_length=50)
    plot = models.TextField(_('Plot'))
    creation_year = models.PositiveIntegerField(validators=[MinValueValidator(1888), MaxValueValidator(datetime.now().year)])
    producer = models.CharField(_('Producer'), max_length=50)
    rate = models.FloatField(_('Rate'))
    genre = models.CharField(_('Genre'), max_length=50, choices=MovieGenre.CHOICES, null=True, blank=True)
    icon = models.ImageField(upload_to='movies/icons/')
    poster = models.ImageField(upload_to='movies/posters/')
    cineroom = models.ForeignKey('cineroom.Cineroom', related_name='movies', on_delete=models.CASCADE, null=True, blank=True)
