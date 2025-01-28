from django.contrib import admin
from . import models


class MovieAdminModel(admin.ModelAdmin):
    list_display = ('title', 'plot', 'creation_year', 'producer', 'rate', 'genre')


admin.site.register(models.Movie, MovieAdminModel)
