from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from .models import *
from django.core.serializers import serialize
import json , requests
from django.views.decorators.csrf import csrf_protect

# Create your views here.

def index (request):
    homePage = open('static/index.html').read()
    return HttpResponse(homePage)

@api_view(["GET"])
def cryptolist (request):
    response = requests.get("https://api.coingecko.com/api/v3/coins/list?include_platform=true")
    response= response.json()
    # print(response)
    # response_json = serialize("json",response)
    # response_json = json.loads(response_json)
    return JsonResponse(response, safe=False)

    

@csrf_protect

@api_view(["POST"])
def signIn(request):
    print("this is request in Sign In", request, request.data)
    email=request.data["email"]
    password=request.data["password"]
    user = authenticate(username=email, password=password)
    if user.is_active:
        try:
            login(request._request, user)
            return JsonResponse({"Success SignIn":True})
        except:
            return JsonResponse({"Success SignIn":False})
    return JsonResponse({"Success SignIn":False})

@csrf_protect
@api_view(["POST"])
def signUp(request):
    print("this is request in Sign Up", request.data)
    try:
        email=request.data["email"]
        password=request.data["password"]
        print("User email and password are:",email, password)
        AppUser.objects.create_user(username=email,email=email,password=password)
        return JsonResponse({"Success SignUp":True})
    except:
        return JsonResponse({"Success SignUp":False})

@api_view(["POST"])
@login_required
def signOut(request):
    if user.is_authenticated():
        try:
            logout(request._request)
            return JsonResponse({"Success SignOut":True})
        except :
            return JsonResponse({"Success SignOut": False})
    return JsonResponse({"Success SignOut": False})

def curr_user (request):
    pass


