from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel
from django.db import models


class Timetable(TimeStampedModel):
    movie = models.ForeignKey('movie.Movie', related_name='timetables', on_delete=models.CASCADE)
    date = models.DateField(_('Date'))
    start_time = models.TimeField(_('Start Time'))
    end_time = models.TimeField(_('End Time'))
    price = models.FloatField(_('Price'), null=True, blank=True)

    class Meta:
        verbose_name = _('Timetable')
        verbose_name_plural = _('Timetables')
        ordering = ['date', 'start_time']

    def __str__(self):
        return f"ID: {self.id} -> {self.movie.title} | {self.date} {self.start_time} - {self.end_time}"
