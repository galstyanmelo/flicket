from django.contrib import admin
from . import models


class CineroomAdminModel(admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(models.Cineroom, CineroomAdminModel)
