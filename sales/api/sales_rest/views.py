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

class AutomobileVOEncoder(ModelEncoder):
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


class Sales_RecordEncoder(ModelEncoder):
    model = Sale_Record
    properties = [
        "sale_price",
        "sales_person",
        "customer",
        "automobile",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": Sales_PersonEncoder(),
        "customer": CustomerEncoder(),
    }

# endregion

#region : API


@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
    # GET
    if request.method == "GET":
        sales_people = Sales_Person.objects.all()
        return JsonResponse({'sales_people': sales_people}, encoder=Sales_PersonEncoder, safe=False)

    # POST
    else:
        try:
            content = json.loads(request.body)
            sales_person = Sales_Person.objects.create(**content)
            return JsonResponse(sales_person, encoder=Sales_PersonEncoder, safe=False)
        except TypeError as e:
            invalid_arg = str(e).split("'")[1]
            return JsonResponse(
                {"Invalid argument": f'Cannot create sales_person with argument: ({invalid_arg})'}, status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_sales_person(request, id):
    # GET
    if request.method == "GET":
        try:
            sales_person = Sales_Person.objects.get(id=id)
            return JsonResponse(sales_person, encoder=Sales_PersonEncoder, safe=False)
        except Sales_Person.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid sales_person id'},
                status=400
            )

    # DELETE
    else:
        try:
            count, _ = Sales_Person.objects.get(id=id).delete()
            return JsonResponse({'Deleted': count > 0})

        except Sales_Person.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid sales_person id'},
                status=400
            )


@require_http_methods(["GET", "POST"])
def api_customers(request):
    # GET
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({'customers': customers}, encoder=CustomerEncoder, safe=False)

    # POST
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except TypeError as e:
            invalid_arg = str(e).split("'")[1]
            return JsonResponse(
                {"Invalid argument": f'Cannot create customer with argument: ({invalid_arg})'}, status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_customer(request, id):
    # GET
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except Customer.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid customer id'},
                status=400
            )
    else:
        try:
            count, _ = Customer.objects.get(id=id).delete()
            return JsonResponse({'Deleted': count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid customer id'},
                status=400
            )


@require_http_methods(["GET", "POST"])
def api_sales_records(request):
    # GET
    if request.method == "GET":
        sales_record = Sale_Record.objects.all()
        return JsonResponse({'sales_records': sales_record}, encoder=Sales_RecordEncoder, safe=False)

    # POST
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(
                import_href=content['automobile'])
            sales_person = Sales_Person.objects.get(
                name=content["sales_person"])
            customer = Customer.objects.get(name=content["customer"])

            content['automobile'] = automobile
            content['sales_person'] = sales_person
            content['customer'] = customer

            sales_record = Sale_Record.objects.create(**content)
            return JsonResponse(
                sales_record, encoder=Sales_RecordEncoder, safe=False
            )

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {'Invalid argument': 'Automobile reference does not exist'},
                status=400
            )
        except Sales_Person.DoesNotExist:
            return JsonResponse(
                {'Invalid argument': 'Sales_Person does not exist'},
                status=400
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {'Invalid argument': 'Customer does not exist'},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_sales_record(request, id):
    if request.method == "GET":
        try:
            record = Sale_Record.objects.get(id=id)
            return JsonResponse(record, encoder=Sales_RecordEncoder, safe=False)
        except Sale_Record.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid sales_record id'},
                status=400
            )
    else:
        try:
            count, _ = Sale_Record.objects.get(id=id).delete()
            return JsonResponse({'Deleted': count > 0})
        except Sale_Record.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid sales_record id'},
                status=400
            )


# endregion


# Test API DELETE-LATER
def api_automobile(request):
    vo = AutomobileVO.objects.all()
    return JsonResponse({'vo': vo}, encoder=AutomobileVOEncoder, safe=False)
