# Generated by Django 2.2.3 on 2019-08-13 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0019_auto_20190813_0925'),
    ]

    operations = [
        migrations.AddField(
            model_name='consumelist',
            name='flagged',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='spec',
            name='flagged',
            field=models.BooleanField(default=False),
        ),
    ]