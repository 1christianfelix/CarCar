from django.urls import path

from .views import api_automobile, api_list_sales_people, api_list_customers

urlpatterns = [
    path("automobileVO/", api_automobile, name="api_automobile"),
    path("sales_people/", api_list_sales_people,
         name="api_list_sales_people"),
    path("customers/", api_list_customers,
         name="api_list_customers"),
]
