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
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers

from webv1.views import categoriesViewSet
#from webv1.views import pamatykLietuvojeViewSet
#from webv1.views import UserLogInViewSet
from webv1.views import VilniusEventsViewSet
from webv1.views import UserLoginViewSet
from webv1.views import UserRegisterViewSet
from webv1.views import LikesViewSet

router = routers.DefaultRouter()

router.register('categories', categoriesViewSet, basename='category')
#router.register('pamatykLietuvoje', pamatykLietuvojeViewSet, basename='pamatykLietuvoje')
#router.register('userLogin', UserLogInViewSet, basename='userLogin')
router.register('vilniusEvents', VilniusEventsViewSet, basename='vilniusEvents')
router.register('userLogin', UserLoginViewSet, basename='userLogin')
router.register('userRegister', UserRegisterViewSet, basename='userRegister')
router.register('clientLikes', LikesViewSet, basename='clientLikes')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    #path('userLogin/', UserLogInViewSet.as_view({'post': 'create'}), name='register'),
]
