# Generated by Django 2.2.2 on 2019-06-14 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_auto_20190614_1119'),
    ]

    operations = [
        migrations.AddField(
            model_name='talenttree',
            name='_architect',
            field=models.CharField(default='[]', max_length=100),
        ),
    ]
