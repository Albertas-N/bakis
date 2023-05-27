from django.shortcuts import render, redirect
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
from django.db.models import Q
from .models import VilniusEvents


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


class UserLikedViewSet(viewsets.ModelViewSet):
    queryset = UserLiked.objects.all()
    serializer_class = UserLikedSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.queryset.filter(user=request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_like(self, request):
        user_id = request.data.get('user').id
        activity_id = request.data.get('entertainment')

        if user_id is not None and activity_id is not None:
            user = UserRegister.objects.get(id=user_id)
            entertainment = VilniusEvents.objects.get(id=activity_id)
            UserLiked.objects.create(user=user, entertainment=entertainment)
            return Response({'status': 'like added'})
        else:
            return Response({'status': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def remove_like(self, request, pk=None):
        user_id = request.data.get('user')
        activity_id = request.data.get('entertainment')

        if activity_id is not None:
            # get user and activity objects
            user = UserRegister.objects.get(id=user_id)
            entertainment = VilniusEvents.objects.get(id=activity_id)

            # remove like
            UserLiked.objects.filter(user=user, entertainment=entertainment).delete()
            return Response({'status': 'like removed'})
        else:
            return Response({'status': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
