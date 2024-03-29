from django.db import models
from django.contrib.auth.models import (AbstractUser)

# Create your models here.

class AppUser (AbstractUser):
    email = models.EmailField(max_length=255,unique=True)

    is_active = models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

class Favorites (models.Model):
    crypto = models.CharField(max_length=255)
    favorites = models.ForeignKey(AppUser,on_delete=models.SET_NULL, blank=True, null=True)
