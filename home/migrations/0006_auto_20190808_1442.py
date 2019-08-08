# Generated by Django 2.2.3 on 2019-08-08 19:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_auto_20190808_1318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='_slot',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Head'), (2, 'Neck'), (3, 'Shoulder'), (4, 'Shirt'), (5, 'Chest'), (6, 'Waist'), (7, 'Legs'), (8, 'Feet'), (9, 'Wrist'), (10, 'Hands'), (11, 'Finger'), (13, 'Trinket'), (15, 'Back'), (16, 'Main Hand'), (17, 'Off Hand'), (18, 'Ranged'), (19, 'Tabard'), (20, 'Bag'), (25, 'One-hand'), (24, 'Two-hand'), (26, 'Thrown'), (28, 'Held In Off-Hand'), (27, 'Relic'), (29, 'Projectile')], default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(20)]),
        ),
        migrations.AlterField(
            model_name='item',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='item',
            unique_together={('ix', 'name')},
        ),
    ]
