# Generated by Django 2.2.3 on 2019-08-12 00:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0017_auto_20190811_1941'),
    ]

    operations = [
        migrations.RenameField(
            model_name='consumelist',
            old_name='visibile',
            new_name='visible',
        ),
        migrations.RenameField(
            model_name='spec',
            old_name='visibile',
            new_name='visible',
        ),
    ]