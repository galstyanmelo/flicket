# Generated by Django 5.1.5 on 2025-01-27 16:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cineroom', '0001_initial'),
        ('movie', '0002_movie_genre'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='cineroom',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='movies', to='cineroom.cineroom'),
        ),
    ]
