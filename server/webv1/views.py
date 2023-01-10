from django.shortcuts import render
import sqlite3
from .models import CategoryType, Category, Component
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
    category_types = CategoryType.objects.all()
    form = CategoryTypeForm()
    if request.method == 'POST':
        form = CategoryTypeForm(request.POST)
        if form.is_valid():
            catid = form.cleaned_data['catid']
            categories = Category.objects.filter(category_type=catid)
            context = {'form': form, 'categories': categories, 'category_types': category_types}
    else:
        context = {'category_types': category_types, 'form': form}
    return render(request, 'home.html', context)


def component_view(request):
    if request.method == 'GET':
        catid = request.GET.get('catid')
        categories = Category.objects.filter(catid=catid)
        components = Component.objects.filter(category__in=categories)
        context = {'categories': categories, 'components': components}
        return render(request, 'categories.html', context)
