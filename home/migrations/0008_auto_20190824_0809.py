# Generated by Django 2.2.4 on 2019-08-24 13:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_user_prevent_context_menu'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='prevent_context_menu',
            new_name='context_menu',
        ),
    ]