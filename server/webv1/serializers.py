from rest_framework import serializers
from .models import Category
# from .models import PamatykLietuvoje
#from .models import UserLogIn
from .models import VilniusEvents
from .models import UserLogin
from .models import UserRegister

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category']

# class PamatykLietuvojeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PamatykLietuvoje
#         fields = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']

# class UserLogInSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserLogIn
#         fields = ['ID', 'Username', 'Password']

class VilniusEventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VilniusEvents
        fields = ['id', 'title', 'image_src', 'date', 'address', 'content']

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLogin
        fields = ['id', 'username', 'password']

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegister
        fields = ['id', 'name', 'email', 'username', 'password']