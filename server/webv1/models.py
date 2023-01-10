from django.db import models

# Create your models here.

class CategoryType(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
        
class Category(models.Model):
    catid = models.ForeignKey(CategoryType, on_delete=models.CASCADE, related_name='category_type_set')
    category_type = models.ForeignKey(CategoryType, on_delete=models.CASCADE, related_name='catid_set')
    
    def __str__(self):
        return self.name

class Component(models.Model):
    catid = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='catid_set')
    category_name = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_name_set')
    description = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.name