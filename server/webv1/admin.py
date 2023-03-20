from django.contrib import admin
from .models import Category, Entertainment, Profile
# Register your models here.
admin.site.register(Category)
admin.site.register(Entertainment)
admin.site.register(Profile)
from .models import PamatykLietuvoje

class PamatykLietuvojeAdminView(admin.ModelAdmin):
    #list_display = ['ID', 'Name']
    list_display = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']
    #list_display = ('nomVille',  'adresse','cp',)
    #fields = ('nomVille', 'adresse','cp',)
    #fields = ['ID', 'Name']
    fields = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']
admin.site.register(PamatykLietuvoje, PamatykLietuvojeAdminView)