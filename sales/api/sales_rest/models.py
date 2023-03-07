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

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse('api_show_sales_person', kwargs={'id': self.id})


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse('api_show_customer', kwargs={'id': self.id})


class Sale_Record(models.Model):
    sale_price = models.CharField(max_length=200)

    sales_person = models.ForeignKey(
        Sales_Person,
        related_name='sale_record',
        on_delete=models.CASCADE,
    )

    customer = models.ForeignKey(
        Customer,
        related_name='sale_record',
        on_delete=models.CASCADE,
    )

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale_record",
        on_delete=models.CASCADE,
    )
