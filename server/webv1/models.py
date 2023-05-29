from django.db import models
import json
from django.contrib.auth.models import User 
from django.contrib.postgres.fields import JSONField


class Category(models.Model):
        id = models.AutoField(primary_key=True)
        category = models.CharField(max_length=30)

        class Meta:
                db_table = 'categories'

        def __str__(self):
                return str(self.id)

class VilniusEvents(models.Model):
        id = models.AutoField(primary_key=True)
        title = models.CharField(max_length=100, null=True)
        image_src = models.TextField(null=True)
        date = models.CharField(max_length=100, null=True)
        address = models.CharField(max_length=100, null=True)
        content = models.TextField(null=True)
        email = models.CharField(max_length=100, null=True)
        working_hours = models.TextField(max_length=100, null=True)
        category = models.ForeignKey(Category, on_delete=models.CASCADE)
        phone_number = models.CharField(max_length=20, null=True)
        rating = models.CharField(max_length=10, null=True)
        latitude = models.CharField(max_length=30, null=True)
        longitude = models.CharField(max_length=30, null=True)

        class Meta:
                db_table = 'vilnius_events_2'
        
        def __str__(self):
                return str(self.id)
        
class UserRegister(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=100)
        email = models.CharField(max_length=100)
        username = models.CharField(max_length=100)
        password = models.CharField(max_length=100)

        class Meta:
                db_table = 'client_register_table'

        def __str__(self):
                return str(self.id)
        
class UserLiked(models.Model):
    user = models.ForeignKey(UserRegister, on_delete=models.CASCADE)
    entertainment = models.ForeignKey(VilniusEvents, on_delete=models.CASCADE, db_column='entertainment_id', to_field='id', db_constraint=False)

    class Meta:
        db_table = 'user_liked'

    def __str__(self):
        return str(self.id)

