from django.urls import path

from search import views

app_name = 'search'

urlpatterns = [
    # path('', views.ListSearchView.as_view(), name='list_search'),
    # path('create/', views.ListCreateSearchView.as_view(), name='create_search'),
    path('kijiji/', views.kijiji, name='kijiji'),
    path('craigslist/', views.craigslist, name='craigslist'),
]