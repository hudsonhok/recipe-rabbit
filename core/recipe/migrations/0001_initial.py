# Generated by Django 4.2.14 on 2024-07-15 18:04

import datetime
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('body', models.TextField()),
                ('edited', models.BooleanField(default=False)),
                ('cooking_time', models.DurationField(default=datetime.timedelta(0))),
                ('ingredients', models.JSONField(default=list)),
                ('instructions', models.JSONField(default=list)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
