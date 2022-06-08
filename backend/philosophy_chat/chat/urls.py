from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('subject/', views.subject_chat_room,
         name='subject_chat_room'),
    ]
