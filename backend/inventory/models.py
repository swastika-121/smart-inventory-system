from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    quantity = models.IntegerField()
    expiry_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    ORDER_TYPE = (
        ('in', 'Incoming'),
        ('out', 'Outgoing'),
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_type = models.CharField(max_length=10, choices=ORDER_TYPE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.order_type}"