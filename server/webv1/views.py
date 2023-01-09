from django.shortcuts import render
import sqlite3

def home_view(request):
    return render(request, 'home.html')

def categories(request):
    category = request.GET.get('categories')
    return render(request, 'categories.html', {'category': category})

def restaurants(request):
    return render(request, 'restaurants.html')

def clubs(request):
    return render(request, 'clubs.html')

def bars(request):
    return render(request, 'bars.html')

def attractions(request):
    return render(request, 'attractions.html')

def about_view(request):
    return render(request, 'about.html')

def my_view(request):
    # Connect to the database
    conn = sqlite3.connect('sqlite_db.db')

    # Create a cursor
    cursor = conn.cursor()

    # Execute a SELECT statement to retrieve the categories
    cursor.execute('SELECT * FROM categories')

    # Fetch all the rows from the result of the SELECT statement
    rows = cursor.fetchall()

    # Convert the rows to a list of dictionaries, with keys matching the column names
    categories = [{'catid': row[0], 'category_name': row[1], 'description': row[2]} for row in rows]

    # Close the connection to the database
    conn.close()

    # Render the template with the categories
    return render(request, 'template.html', {'categories': categories})
