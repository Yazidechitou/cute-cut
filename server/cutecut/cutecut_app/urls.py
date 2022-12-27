from django.urls import path, re_path
from . import views

urlpatterns = [
    path('',views.index),
    path('api/cryptolist/',views.cryptolist),
    path('api/cryptonews/<str:category>',views.cryptonews),
    path('signin/',views.signIn),
    path('signup/',views.signUp),
    path('signout/',views.signOut),
    path('current_user/', views.current_user),
    re_path('.*/',views.index)
]
