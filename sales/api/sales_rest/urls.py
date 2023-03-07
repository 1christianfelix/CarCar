from django.urls import path

from .views import api_automobile, api_list_sales_people

urlpatterns = [
    path("automobileVO/", api_automobile, name="api_automobile"),
    path("sales_people/", api_list_sales_people,
         name="api_list_sales_people")
]
