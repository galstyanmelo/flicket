from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel
from django.db import models


class Seat(TimeStampedModel):
    timetable = models.ForeignKey('order.Timetable', related_name='seats', on_delete=models.CASCADE)
    row = models.PositiveIntegerField(_('Row'))
    column = models.PositiveIntegerField(_('Column'))

    class Meta:
        verbose_name = _('Seat')
        verbose_name_plural = _('Seats')
        unique_together = ('timetable', 'row', 'column')

    def __str__(self):
        return f"Seat {self.row}{self.column}"
