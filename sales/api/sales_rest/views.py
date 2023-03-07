from django.shortcuts import render
from django.http import JsonResponse
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
    pass
    model = AutomobileVO
    properties = [
        'import_href',
        'color',
        'year',
        'vin',
    ]

# endregion

#region : API


def api_automobile(request):
    vo = AutomobileVO.objects.all()
    return JsonResponse({'vo': vo}, encoder=vo_encoder, safe=False)

# endregion
