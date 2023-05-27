from django.contrib import admin
from .models import Category
# Register your models here.
admin.site.register(Category)


#from .models import PamatykLietuvoje
from .models import VilniusEvents, UserRegister, UserLiked

# class PamatykLietuvojeAdminView(admin.ModelAdmin):
#     list_display = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']

# admin.site.register(PamatykLietuvoje, PamatykLietuvojeAdminView)

class VilniusEventsAdminView(admin.ModelAdmin):
    list_display = ('id',"title",'image_src', 'date', 'address', 'content', 'email', 'working_hours', 'category', 'phone_number', 'rating')

admin.site.register(VilniusEvents, VilniusEventsAdminView)

class UserRegisterAdminView(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'username', 'password')

admin.site.register(UserRegister, UserRegisterAdminView)

class UserLikedAdminView(admin.ModelAdmin):
    list_display = ('id', 'user', 'entertainment')

admin.site.register(UserLiked, UserLikedAdminView)
