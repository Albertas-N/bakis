from django.shortcuts import render, redirect, get_object_or_404
import sqlite3
from django.contrib import messages
from django.db import models
from django import forms
from django.http import JsonResponse
from .models import Category
from .models import VilniusEvents
from .models import UserRegister, UserLiked
from .serializers import CategorySerializer
from .serializers import VilniusEventsSerializer
from .serializers import UserRegisterSerializer, UserLikedSerializer
from rest_framework import serializers, viewsets, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from django.db.models import Q, F
from .models import VilniusEvents
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import BooleanField, ExpressionWrapper



def home_view(request):
    return render(request, 'web/home.html')


class categoriesViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class VilniusEventsViewSet(viewsets.ModelViewSet):
    queryset = VilniusEvents.objects.all()
    serializer_class = VilniusEventsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        category_names = self.request.query_params.getlist('categories', None)
        event_ids = self.request.query_params.getlist('ids', None)

        if search_term is not None:
            queryset = queryset.filter(
                Q(title__icontains=search_term) |
                Q(content__icontains=search_term) |
                Q(category__category__icontains=search_term)
            )

        if category_names is not None and len(category_names) > 0:
            queryset = queryset.filter(category__category__in=category_names)

        if event_ids is not None and len(event_ids) > 0:
            queryset = queryset.filter(id__in=event_ids)

        return queryset


class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = UserRegister.objects.all()
    serializer_class = UserRegisterSerializer

    @action(detail=False, methods=['get'], url_path='checkUsername/(?P<username>\w+)')
    def check_username(self, request, username=None):
        if UserRegister.objects.filter(username=username).exists():
            return JsonResponse({'exists': True})
        else:
            return JsonResponse({'exists': False})

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = UserRegister.objects.get(username=username)

            if user.password == password:
                return Response(UserRegisterSerializer(user).data)
            else:
                return Response({'error': 'Invalid username or password.'}, status=400)

        except UserRegister.DoesNotExist:
            return Response({'error': 'Invalid username or password.'}, status=400)


User = get_user_model()


def authenticate_user_by_id(user_id):
    try:
        user = UserRegister.objects.get(pk=user_id)
        return user
    except ObjectDoesNotExist:
        return None


class UserLikedViewSet(viewsets.ModelViewSet):
    queryset = UserLiked.objects.all()
    serializer_class = UserLikedSerializer

    def get_queryset(self):
        queryset = self.queryset
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            queryset = queryset.filter(user=user_id)
        return queryset

    @action(detail=False, methods=['get'], url_path='recommendations/(?P<user_id>\w+)')
    def recommendations(self, request, user_id=None):
        authenticated_user = authenticate_user_by_id(user_id)
        if authenticated_user is not None:
            liked_categories_ids = UserLiked.objects.filter(user=authenticated_user).values_list('entertainment__category_id', flat=True)
            recommended_items = VilniusEvents.objects.filter(category_id__in=liked_categories_ids)
            recommended_items = recommended_items.annotate(
                null_rating=ExpressionWrapper(Q(rating__isnull=True), output_field=BooleanField())
            ).order_by('null_rating', '-rating')
            serializer = VilniusEventsSerializer(recommended_items, many=True)
            return Response(serializer.data)
        else:
            return Response({'status': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['post'])
    def add_like(self, request):
        user_id = request.data.get('user')
        print('Received user_id:', user_id)
        activity_id = request.data.get('entertainment')

        if user_id is not None and activity_id is not None:
            authenticated_user = authenticate_user_by_id(user_id)
            if authenticated_user is not None:
                print('Authenticated user:', authenticated_user)
                user_liked_data = {
                    'user': authenticated_user.id,
                    'entertainment': activity_id
                }
                serializer = self.serializer_class(data=user_liked_data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'status': 'like added'}, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                print('No user found with ID:', user_id)
                return Response({'status': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'status': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def remove_like(self, request):
        user_id = request.data.get('user')
        activity_id = request.data.get('entertainment')

        if user_id is not None and activity_id is not None:
            authenticated_user = authenticate_user_by_id(user_id)
            if authenticated_user is not None:
                try:
                    user_liked = UserLiked.objects.get(user=authenticated_user.id, entertainment=activity_id)
                    user_liked.delete()
                    return Response({'status': 'like removed'}, status=status.HTTP_200_OK)
                except UserLiked.DoesNotExist:
                    return Response({'status': 'User like not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'status': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'status': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)