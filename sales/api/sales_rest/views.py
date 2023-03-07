from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import (
    AutomobileVO,
    Sale_Record,
    Sales_Person,
    Customer
)
# Create your views here.


#region : Encoders

class vo_encoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'import_href',
        'color',
        'year',
        'vin',
    ]


class Sales_PersonEncoder(ModelEncoder):
    model = Sales_Person
    properties = [
        'name',
        'employee_number'
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'address',
        'phone_number',
    ]

# endregion

#region : API


@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    # GET
    if request.method == "GET":
        sales_people = Sales_Person.objects.all()
        return JsonResponse({'sales_people': sales_people}, encoder=Sales_PersonEncoder, safe=False)

    # POST
    else:
        content = json.loads(request.body)
        sales_person = Sales_Person.objects.create(**content)
        return JsonResponse(sales_person, encoder=Sales_PersonEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    # GET
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({'customers': customers}, encoder=CustomerEncoder, safe=False)

    # POST
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)

# endregion


# Test API DELETE-LATER
def api_automobile(request):
    vo = AutomobileVO.objects.all()
    return JsonResponse({'vo': vo}, encoder=vo_encoder, safe=False)
