# Generated by Django 2.2.3 on 2019-08-12 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0016_auto_20190810_1525'),
    ]

    operations = [
        migrations.AddField(
            model_name='consumelist',
            name='visibile',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='spec',
            name='visibile',
            field=models.BooleanField(default=True),
        ),
    ]