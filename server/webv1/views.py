from django.shortcuts import render, redirect
import sqlite3
from django.contrib import messages
from django.db import models
from django import forms
from .models import Category
from .models import VilniusEvents
from .models import UserRegister, UserLiked
from .serializers import CategorySerializer
from .serializers import VilniusEventsSerializer
from .serializers import UserRegisterSerializer, UserLikedSerializer
from rest_framework import serializers, viewsets, status, generics
from rest_framework.response import Response


def home_view(request):
    return render(request, 'web/home.html')

class categoriesViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class VilniusEventsViewSet(viewsets.ModelViewSet):
    queryset = VilniusEvents.objects.all()
    serializer_class = VilniusEventsSerializer
    
class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = UserRegister.objects.all()
    serializer_class = UserRegisterSerializer

class UserLikedViewSet(viewsets.ModelViewSet):
    queryset = UserLiked.objects.all()
    serializer_class = UserLikedSerializer


