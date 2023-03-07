from django.urls import path

from .views import api_automobile

urlpatterns = [
    path("automobileVO/", api_automobile, name="api_automobile"),
]
