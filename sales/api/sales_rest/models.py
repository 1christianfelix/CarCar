from django.db import models
from django.urls import reverse

# Create your models here.

# Models we need:
# sales person
# potential customer
# sale record


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)


class Sales_Person(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200)


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_nummber = models.CharField(max_length=200)


class Sale_Record(models.Model):
    sale_price = models.CharField(max_length=200)

    sales_person = models.ForeignKey(
        Sales_Person,
        related_name='sale_record',
        on_delete=models.CASCADE,
    )

    custom = models.ForeignKey(
        Customer,
        related_name='sale_record',
        on_delete=models.CASCADE
    )
