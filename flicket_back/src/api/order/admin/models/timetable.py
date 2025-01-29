from django.contrib import admin


class TimetableAdminModel(admin.ModelAdmin):
    list_display = ('movie', 'date', 'start_time', 'end_time', 'price')