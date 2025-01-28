from django.contrib import admin

from . import models as admin_models
from src.api.order import models


admin.site.register(models.Timetable, admin_models.TimetableAdminModel)
admin.site.register(models.Seat, admin_models.SeatAdminModel)