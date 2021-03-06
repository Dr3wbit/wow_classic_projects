# Generated by Django 2.2.4 on 2019-08-23 21:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_auto_20190823_1129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='queue_type',
            field=models.PositiveSmallIntegerField(default=1, help_text='1 for Specs, 2 for CLs', validators=[django.core.validators.MaxValueValidator(3)]),
        ),
        migrations.AlterField(
            model_name='wowclass',
            name='img',
            field=models.CharField(max_length=50),
        ),
    ]
