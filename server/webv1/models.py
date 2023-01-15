from django.db import models

class Category_typetb(models.Model):
    catid = models.AutoField(primary_key=True)
    category_type = models.CharField(max_length=250)

"""    class Meta:
        managed = False
        db_table = 'category_typetb_new'"""

class Categoriestb(models.Model):
    category_id = models.CharField(max_length=250)
    category_name = models.CharField(max_length=250)
    description = models.CharField(max_length=250)

"""    class Meta:
        managed = False
        db_table = 'categoriestb_new'"""