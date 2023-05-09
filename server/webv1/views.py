from django.shortcuts import render, redirect
import sqlite3
from django.contrib import messages
from django.db import models
from django import forms
from .models import Category
# from .models import PamatykLietuvoje
from .models import VilniusEvents
#from .models import UserLogIn
from .models import UserLogin
from .models import UserRegister
from .serializers import CategorySerializer
# from .serializers import PamatykLietuvojeSerializer
#from .serializers import UserLogInSerializer
from .serializers import VilniusEventsSerializer
from .serializers import UserLoginSerializer
from .serializers import UserRegisterSerializer
from rest_framework import serializers, viewsets, status, generics
from rest_framework.response import Response


def home_view(request):
    return render(request, 'web/home.html')

class categoriesViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# class pamatykLietuvojeViewSet(viewsets.ModelViewSet):
#     queryset = PamatykLietuvoje.objects.all()
#     serializer_class = PamatykLietuvojeSerializer

# class UserLogInViewSet(viewsets.ModelViewSet):
#     queryset = UserLogIn.objects.all()
#     serializer_class = UserLogInSerializer

#     def create(self, request, *args, **kwargs):
#         email = request.data.get('email')
#         username = request.data.get('username')
#         password = request.data.get('password')

#         # perform any necessary validation here
#         # ...

#         user_login = UserLogIn.objects.create(
#             email=email,
#             username=username,
#             password=password
#         )

#         serializer = self.get_serializer(user_login)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class VilniusEventsViewSet(viewsets.ModelViewSet):
    queryset = VilniusEvents.objects.all()
    serializer_class = VilniusEventsSerializer
    
class UserLoginViewSet(viewsets.ModelViewSet):
    queryset = UserLogin.objects.all()
    serializer_class = UserLoginSerializer
    
class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = UserRegister.objects.all()
    serializer_class = UserRegisterSerializer