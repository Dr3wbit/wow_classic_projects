# Generated by Django 2.2.3 on 2019-08-09 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0012_auto_20190809_0652'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crafted',
            name='profession',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Profession'),
        ),
    ]