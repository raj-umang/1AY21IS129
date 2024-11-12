from django.urls import path
from myapp.views import htop_view

urlpatterns = [
    path('', htop_view, name='htop'),
]
