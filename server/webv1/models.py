from django.db import models

# Create your models here.

class CategoryType(models.Model):
    category_type = models.CharField(max_length=255)

    def __str__(self):
        return self.category_type

class Category(models.Model):
    category_type = models.ForeignKey(CategoryType, on_delete=models.CASCADE, related_name='categories')
    category_name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.category_name

class Component(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='components')
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name