from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer


# Product API
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# Order API with stock logic
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        order = serializer.save()
        product = order.product

        if order.order_type == 'in':
            product.quantity += order.quantity
        elif order.order_type == 'out':
            product.quantity -= order.quantity

        product.save()


# 🔔 LOW STOCK ALERT API
@api_view(['GET'])
def low_stock_products(request):
    products = Product.objects.filter(quantity__lt=10)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)