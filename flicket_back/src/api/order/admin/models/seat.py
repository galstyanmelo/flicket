from django.contrib import admin


class SeatAdminModel(admin.ModelAdmin):
    list_display = ('timetable', 'row', 'column')