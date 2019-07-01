# Generated by Django 2.2.2 on 2019-06-21 22:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0023_auto_20190621_1700'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crafted',
            name='prof',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Profession'),
        ),
        migrations.AlterField(
            model_name='profession',
            name='name',
            field=models.CharField(choices=[('alchemy', 'alchemy'), ('blacksmithing', 'blacksmithing'), ('cooking', 'cooking'), ('enchanting', 'enchanting'), ('engineering', 'engineering'), ('leatherworking', 'leatherworking'), ('first_aid', 'first_aid'), ('skinning', 'skinning'), ('fishing', 'fishing'), ('herbalism', 'herbalism'), ('mining', 'mining')], default='alchemy', max_length=20, unique=True),
        ),
    ]
