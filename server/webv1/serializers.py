from rest_framework import serializers
from .models import Category
from .models import PamatykLietuvoje
from .models import UserLogIn

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['cat_id', 'category_type']

class PamatykLietuvojeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PamatykLietuvoje
        fields = ['ID', 'Name', 'Address', 'Phone', 'Email', 'WorkingHours', 'Description']

class UserLogInSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLogIn
        fields = ['ID', 'Username', 'Password']