from django.shortcuts import render, redirect
import sqlite3
from django.contrib import messages
from django.db import models
from django import forms


def home_view(request):
    return render(request, 'web/home.html')


def categories(request):
    category = request.GET.get('categories')
    return render(request, 'web/categories.html', {'category': category})


def restaurants(request):
    return render(request, 'web/restaurants.html')


def clubs(request):
    return render(request, 'web/clubs.html')


def bars(request):
    return render(request, 'web/bars.html')


def attractions(request):
    return render(request, 'web/attractions.html')


def about_view(request):
    return render(request, 'web/about.html')
    

def my_view(request):
    # Connect to the database
    conn = sqlite3.connect('sqlite_db.db')


# creating a view to retrieve all category types and categories from database
def home(request):
    category_types = Category_typetb.objects.all()
    form = CategoryTypeForm()
    return render(request, 'web/home.html', {'category_types': category_types}, {'form': form})

def categories(request, catid):
    category_type = Category_typetb.objects.get(catid=catid)
    categories = Categoriestb.objects.filter(category_id=category_type)
    return render(request, 'web/categories.html', {'categories': categories})
