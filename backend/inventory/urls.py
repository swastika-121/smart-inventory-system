from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderViewSet, low_stock_products, dashboard_data

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('low-stock/', low_stock_products),
    path('dashboard/', dashboard_data),
]