from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel
from django.db import models


class Cineroom(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=32)

