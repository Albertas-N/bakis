from django.db import models
import json
from django.contrib.auth.models import User 
from django.contrib.postgres.fields import JSONField

class Category_typetb(models.Model):
    catid = models.AutoField(primary_key=True)
    category_type = models.CharField(max_length=250)
    def __str__(self):
        return self.name
    class Meta:
        managed = False
        db_table = 'category_typetb_new'

class Categoriestb(models.Model):
    category_id = models.CharField(max_length=250)
    category_name = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
  
    def __str__(self):
        return self.name
    class Meta:
        managed = False
        db_table = 'categoriestb_new'


class Category(models.Model):
        id = models.AutoField(primary_key=True)
        category = models.CharField(max_length=30)

        class Meta:
                db_table = 'categories'
                managed = False

        def __str__(self):
                return self.name


class Entertainment(models.Model):
        ent_id= models.AutoField(primary_key=True)
        ent_title = models.CharField(max_length=50)
        cat_id = models.ForeignKey(Category, on_delete=models.CASCADE)
        description = models.CharField(max_length=250)
        location = models.CharField(max_length=100)
        #picture???

class Profile(models.Model):   #add this class and the following fields
        user = models.OneToOneField(User, on_delete=models.CASCADE)
        user_like = models.JSONField()#tures buti tikrinamas ar nera istrintas ent
        #Entertainment, on_delete=models.CASCADE
        user_seen = models.IntegerField()
        user_setting = models.CharField(max_length=50)

# class PamatykLietuvoje(models.Model): 
#         ID = models.AutoField(primary_key=True)
#         Name = models.CharField(max_length=100)
#         Address = models.CharField(max_length=100)
#         Phone = models.CharField(max_length=100)
#         Email = models.CharField(max_length=100)
#         WorkingHours = models.CharField(max_length=100)
#         Description = models.TextField()

#         class Meta:
#                 managed = False
#                 db_table = "pamatyk_Lietuvoje"

# class UserLogIn(models.Model):
#         ID = models.AutoField(primary_key=True)
#         Username = models.CharField(max_length=100)
#         Password = models.CharField(max_length=100)
        
#         class Meta:
#                 managed = False
#                 db_table = "user"

class VilniusEvents(models.Model):
        id = models.AutoField(primary_key=True)
        title = models.CharField(max_length=100)
        image_src = models.TextField()
        date = models.CharField(max_length=100)
        address = models.CharField(max_length=100)
        content = models.TextField()
        email = models.CharField(max_length=100)
        working_hours = models.TextField()
        category = models.CharField(max_length=100)
        phone_number = models.CharField(max_length=20)
        rating = models.CharField(max_length=10)

        class Meta:
                db_table = 'vilnius_events'
                managed = False
        
        def __str__(self):
                return self.name

class UserLogin(models.Model):
        id = models.AutoField(primary_key=True)
        username = models.CharField(max_length=100)
        password = models.CharField(max_length=100)

        class Meta:
                db_table = 'client_login_table'
                managed = False

        def __str__(self):
                return self.name

class UserRegister(models.Model):
        id = models.AutoField(primary_key=True)
        name = models.CharField(max_length=100)
        email = models.CharField(max_length=100)
        username = models.CharField(max_length=100)
        password = models.CharField(max_length=100)

        class Meta:
                db_table = 'client_register_table'
                managed = False

        def __str__(self):
                return self.name

class Likes(models.Model):
        client_id = models.AutoField(primary_key=True)
        activity_id_list = models.TextField(default="[]")

        def add_activity(self, client_id, activity_id):
                activity_list = json.loads(self.activity_id_list)
                activity_list.append(activity_id)
                self.activity_id_list = json.dumps(activity_list)
                self.save()

        class Meta:
                db_table = 'client_likes_table'
                managed = False

        def __str__(self):
                return self.name
