import json
from rest_framework import serializers
from .models import Category
from .models import VilniusEvents
from .models import UserRegister
from .models import UserLiked

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category']

class VilniusEventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VilniusEvents
        fields = ['id',"title",'image_src', 'date', 'address', 'content', 'email', 'working_hours', 'category', 'phone_number', 'rating', 'latitude', 'longitude']

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegister
        fields = ['id', 'name', 'email', 'username', 'password']

class UserLikedSerializer(serializers.ModelSerializer):    
    class Meta:
        model = UserLiked
        fields = ['id', 'user', 'entertainment']
        
    def get_related_user_record(self, obj):
        if not self.context["request"].user.pk:
            return None
