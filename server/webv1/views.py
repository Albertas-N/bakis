from django.shortcuts import render, redirect
import sqlite3
from django.contrib import messages
from .models import CategoryType, Category, Component
from django import forms


def home_view(request):
    return render(request, 'web/home.html')


def categories(request):
    category = request.GET.get('categories')
    return render(request, 'web/categories.html', {'category': category})


def about_view(request):
    return render(request, 'web/about.html')


def my_view(request):
    # Connect to the database
    conn = sqlite3.connect('sqlite_db.db')

# creating a view to retrieve all category types and categories from database
def home(request):
    category_types = CategoryType.objects.all()
    return render(request, 'home.html', {'category_types': category_types})

def component_view(request):
    if request.method == 'GET':
        category_type = request.GET.get('category_type')
        categories = Category.objects.filter(category_type__name=category_type)
        if not categories:
            messages.error(request, "Invalid category selected.")
            return redirect('home')
        components = Component.objects.filter(category__in=categories)
        context = {'category_name': category_type, 'components': components}
        return render(request, 'categories.html', context)
    else:
        messages.error(request, "Invalid request method.")
        return redirect('home.html')
