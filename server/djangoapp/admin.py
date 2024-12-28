from django.contrib import admin
from .models import CarMake, CarModel

# Registering models with their respective admin classes

admin.site.register(CarMake)
admin.site.register(CarModel)
