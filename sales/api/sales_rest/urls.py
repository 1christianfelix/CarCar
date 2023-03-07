from django.urls import path

from .views import api_automobile, api_sales_persons, api_customers, api_sales_records, api_sales_person

urlpatterns = [
    path("automobileVO/", api_automobile, name="api_automobile"),

    # Sales_Person
    path(
        "sales_people/",
        api_sales_persons,
        name="api_list_sales_persons"),
    path(
        "sales_person/<int:id>/",
        api_sales_person,
        name="api_show_sales_person"),

    # Customer
    path(
        "customers/",
        api_customers,
        name="api_list_customer"),

    # Sales_Record
    path(
        "sales_records/",
        api_sales_records,
        name="api_list_sales_record"),
]
