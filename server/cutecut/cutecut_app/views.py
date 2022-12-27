from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from .models import *
from django.core.serializers import serialize
import json , requests
import http.client
from django.views.decorators.csrf import csrf_protect, csrf_exempt


def index (request):
    homePage = open('static/index.html').read()
    return HttpResponse(homePage)

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
            return JsonResponse({"SignIn":True})
        except:
            return JsonResponse({"SignIn":False})
    return JsonResponse({"SignIn":False})

@csrf_protect
@api_view(["POST"])
def signUp(request):
    print("this is request in Sign Up", request.data)
    try:
        email=request.data["email"]
        password=request.data["password"]
        print("User email and password are:",email, password)
        AppUser.objects.create_user(username=email,email=email,password=password)
        return JsonResponse({"SignUp":True})
    except:
        return JsonResponse({"SignUp":False})

@api_view(["POST"])
@login_required
def signOut(request):
    if user.is_authenticated():
        try:
            logout(request._request)
            return JsonResponse({"SignOut":True})
        except :
            return JsonResponse({"SignOut": False})
    return JsonResponse({"SignOut": False})

@api_view(["GET"])
def current_user (request):
    if request.user.is_authenticated:
        data = serialize("json", [request.user], fields=["email"])
        print(data)
        return JsonResponse(data, safe=False)
    return JsonResponse({"user":None})


@api_view(["GET"])
def cryptolist (request):
    conn = http.client.HTTPSConnection("coinranking1.p.rapidapi.com")
    headers = {
    'X-RapidAPI-Key': "c6b134ca9amshb4c2b50e15d6438p153f0bjsnd635775334a8",
    'X-RapidAPI-Host': "coinranking1.p.rapidapi.com"
    }
    conn.request("GET", "/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=500&offset=0", headers=headers)
    res = conn.getresponse()
    data = res.read()
    data= data.decode("utf-8")
    data_json = data.replace("'", '"')
    data_json = json.loads(data_json)
    return JsonResponse(data_json, safe=False)


@api_view(["GET"])
def cryptonews (request,category):
    print("Request of crypto news", category)
    url = "https://bing-news-search1.p.rapidapi.com/news/search"
    querystring = {"q":category,"safeSearch":"Off", "textFormat":"Raw","freshness":"Day","count":"100"}
    headers = {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "c6b134ca9amshb4c2b50e15d6438p153f0bjsnd635775334a8",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    response = response.json()
    return JsonResponse(response, safe=False)

