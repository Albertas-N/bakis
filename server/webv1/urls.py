from django.urls import path
from . import views

"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('categories', views.categories, name='categories'),
    path('categories/restaurants', views.restaurants, name='restaurants'),
    path('categories/bars', views.bars, name='bars'),
    path('categories/clubs', views.clubs, name='clubs'),
    path('categories/attractions', views.attractions, name='attractions'),
    path('categories', views.component_view, name='component_view')
]
