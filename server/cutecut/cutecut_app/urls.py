from django.urls import path, re_path
from . import views

urlpatterns = [
    path('',views.index),
    path('api/cryptolist',views.cryptolist),
    path('signin/',views.signIn),
    path('signup/',views.signUp),
    path('signout/',views.signOut),
    path('curr_user', views.curr_user),
    re_path('.*/',views.index)
]
