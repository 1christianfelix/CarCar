from django.urls import path

from .views import (
    api_automobile,
    api_sales_persons,
    api_customers,
    api_sales_records,
    api_sales_person,
    api_sales_record,
    api_customer,
)

urlpatterns = [
    path("automobileVO/", api_automobile, name="api_automobile"),

    # Sales_Person
    path(
        "sales_person/",
        api_sales_persons,
        name="api_sales_persons"),
    path(
        "sales_person/<int:id>/",
        api_sales_person,
        name="api_sales_person"),

    # Customer
    path(
        "customer/",
        api_customers,
        name="api_customers"),
    path(
        "customer/<int:id>/",
        api_customer,
        name="api_customer"),

    # Sales_Record
    path(
        "sales_records/",
        api_sales_records,
        name="api_sales_records"),
    path(
        "sales_records/<int:id>/",
        api_sales_record,
        name="api_sales_record"),
]
