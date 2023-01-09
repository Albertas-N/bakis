from django.shortcuts import render
import sqlite3

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
0
def about_view(request):
    return render(request, 'web/about.html')

def my_view(request):
    # Connect to the database
    conn = sqlite3.connect('sqlite_db.db')

