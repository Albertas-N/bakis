from django.contrib import admin
from django.urls import include, path
from django.conf.urls import include
from rest_framework import routers
from rest_framework.routers import DefaultRouter

from webv1.views import categoriesViewSet
from webv1.views import VilniusEventsViewSet
from webv1.views import UserRegisterViewSet
from webv1.views import UserLikedViewSet

router = routers.DefaultRouter()

router.register('categories', categoriesViewSet, basename='category')
router.register('vilniusEvents', VilniusEventsViewSet, basename='vilniusEvents')
router.register('userRegister', UserRegisterViewSet, basename='userRegister')
router.register('userLiked', UserLikedViewSet, basename='userLiked')
router.register(r'vilniusEvents', VilniusEventsViewSet)
router.register(r'userRegister', UserRegisterViewSet, basename='userRegister')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]

