# Generated by Django 2.2.2 on 2019-06-21 20:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0018_auto_20190621_1523'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crafted',
            name='profession',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Profession'),
        ),
    ]
