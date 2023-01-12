from django.db import models

class category_typetb(models.Model):
    catid = models.AutoField(primary_key=True)
    category_type = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'category_typetb'

class categoriestb(models.Model):
    catid = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    catid_type = models.ForeignKey(category_typetb, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'categoriestb'