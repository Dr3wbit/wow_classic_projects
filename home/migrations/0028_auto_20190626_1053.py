# Generated by Django 2.2.2 on 2019-06-26 15:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0027_auto_20190626_1031'),
    ]

    operations = [
        migrations.AddField(
            model_name='consumelist',
            name='hash',
            field=models.CharField(default='testy test', max_length=100),
        ),
        migrations.CreateModel(
            name='Consume',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invested', models.PositiveSmallIntegerField(default=1, validators=[django.core.validators.MaxValueValidator(100)])),
                ('consume_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.ConsumeList')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Crafted')),
            ],
            options={
                'unique_together': {('item', 'consume_list')},
            },
        ),
    ]
