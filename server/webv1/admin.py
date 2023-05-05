from django.contrib import admin
from .models import Category, Entertainment, Profile
# Register your models here.
admin.site.register(Category)
admin.site.register(Entertainment)
admin.site.register(Profile)

from .models import PamatykLietuvoje
from .models import VilniusEvents, UserLogin, UserRegister

class PamatykLietuvojeAdminView(admin.ModelAdmin):
    list_display = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']

admin.site.register(PamatykLietuvoje, PamatykLietuvojeAdminView)

class VilniusEventsAdminView(admin.ModelAdmin):
    list_display = ('id',"title",'image_src', 'date', 'address', 'content')
    def get_queryset(self, request):
        return VilniusEvents.objects.using('postgresql').all()

admin.site.register(VilniusEvents, VilniusEventsAdminView)

class UserLoginAdminView(admin.ModelAdmin):
    list_display = ('id', 'username', 'password')
    def get_queryset(self, request):
        return UserLogin.objects.using('postgresql').all()

admin.site.register(UserLogin, UserLoginAdminView)

class UserRegisterAdminView(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'username', 'password')
    def get_queryset(self, request):
        return UserRegister.objects.using('postgresql').all()

admin.site.register(UserRegister, UserRegisterAdminView)