from django.urls import path

from .views import api_automobile, api_list_sales_people, api_list_customers, api_list_sales_record, api_show_sales_person

urlpatterns = [
    path("automobileVO/", api_automobile, name="api_automobile"),

    # Sales_Person
    path("sales_people/", api_list_sales_people,
         name="api_list_sales_people"),
    path("sales_person/<int:id>/", api_show_sales_person,
         name="api_show_sales_person"),

    # Customer
    path("customers/", api_list_customers,
         name="api_list_customers"),

    # Sales_Record
    path("sales_records/", api_list_sales_record,
         name="api_list_sales_record"),
]
