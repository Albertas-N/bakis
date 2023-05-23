from django.contrib import admin
from .models import Category, Entertainment, Profile
# Register your models here.
admin.site.register(Category)
admin.site.register(Entertainment)
admin.site.register(Profile)

#from .models import PamatykLietuvoje
from .models import VilniusEvents, UserLogin, UserRegister, Likes

# class PamatykLietuvojeAdminView(admin.ModelAdmin):
#     list_display = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']

# admin.site.register(PamatykLietuvoje, PamatykLietuvojeAdminView)

class VilniusEventsAdminView(admin.ModelAdmin):
    list_display = ('id',"title",'image_src', 'date', 'address', 'content', 'email', 'working_hours', 'category', 'phone_number', 'rating')

admin.site.register(VilniusEvents, VilniusEventsAdminView)

class UserLoginAdminView(admin.ModelAdmin):
    list_display = ('id', 'username', 'password')

admin.site.register(UserLogin, UserLoginAdminView)

class UserRegisterAdminView(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'username', 'password')

admin.site.register(UserRegister, UserRegisterAdminView)

class LikesAdminView(admin.ModelAdmin):
    list_display = ('client_id', 'activity_id_list')

admin.site.register(Likes, LikesAdminView)