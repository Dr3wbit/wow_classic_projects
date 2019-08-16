# Generated by Django 2.2.3 on 2019-08-09 10:35

import django.contrib.postgres.fields.jsonb
import django.core.serializers.json
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_auto_20190808_1841'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='durability',
            field=models.PositiveSmallIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(400)]),
        ),
        migrations.AddField(
            model_name='item',
            name='resists',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, encoder=django.core.serializers.json.DjangoJSONEncoder, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='val',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, encoder=django.core.serializers.json.DjangoJSONEncoder, help_text='Monetary Value', null=True),
        ),
        migrations.CreateModel(
            name='Damage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('high', models.PositiveSmallIntegerField(default=2)),
                ('low', models.PositiveSmallIntegerField(default=1)),
                ('i', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='home.Item')),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.School')),
            ],
            options={
                'unique_together': {('i', 'school')},
            },
        ),
        migrations.AddField(
            model_name='item',
            name='damage',
            field=models.ManyToManyField(to='home.Damage'),
        ),
    ]