# Generated by Django 4.1.4 on 2023-03-16 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webv1', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PamatykLietuvoje',
            fields=[
                ('ID', models.AutoField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=100)),
                ('Address', models.CharField(max_length=100)),
                ('Phone', models.CharField(max_length=100)),
                ('Email', models.CharField(max_length=100)),
                ('WorkingHours', models.CharField(max_length=100)),
                ('Discription', models.TextField()),
            ],
        ),
    ]