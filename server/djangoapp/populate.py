import logging
from .models import CarMake, CarModel

# Set up logging
logger = logging.getLogger(__name__)


def initiate():
    logger.info("Starting data population...")

    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology"},
        {"name": "Mercedes", "description": "Great cars. German technology"},
        {"name": "Audi", "description": "Great cars. German technology"},
        {"name": "Kia", "description": "Great cars. Korean technology"},
        {"name": "Toyota", "description": "Great cars. Japanese technology"},
    ]

    car_make_instances = []
    for data in car_make_data:
        try:
            car_make_instance = CarMake.objects.create(
                name=data['name'], description=data['description']
            )
            car_make_instances.append(car_make_instance)
            logger.info(f"Created CarMake: {data['name']}")
        except Exception as e:
            logger.error(f"Error creating CarMake {data['name']}: {e}")

    # Create CarModel instances with the corresponding CarMake instances
    car_model_data = [
        {
            "name": "Pathfinder",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[0],
            "dealer_id": 1,
        },
        {
            "name": "Qashqai",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[0],
            "dealer_id": 1,
        },
        {
            "name": "XTRAIL",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[0],
            "dealer_id": 2,
        },
        {
            "name": "A-Class",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[1],
            "dealer_id": 2,
        },
        {
            "name": "C-Class",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[1],
            "dealer_id": 3,
        },
        {
            "name": "E-Class",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[1],
            "dealer_id": 3,
        },
        {
            "name": "A4",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[2],
            "dealer_id": 2,
        },
        {
            "name": "A5",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[2],
            "dealer_id": 5,
        },
        {
            "name": "A6",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[2],
            "dealer_id": 4,
        },
        {
            "name": "Sorrento",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[3],
            "dealer_id": 3,
        },
        {
            "name": "Carnival",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[3],
            "dealer_id": 6,
        },
        {
            "name": "Cerato",
            "type": "Sedan",
            "year": 2023,
            "car_make": car_make_instances[3],
            "dealer_id": 6,
        },
        {
            "name": "Corolla",
            "type": "Sedan",
            "year": 2023,
            "car_make": car_make_instances[4],
            "dealer_id": 7,
        },
        {
            "name": "Camry",
            "type": "Sedan",
            "year": 2023,
            "car_make": car_make_instances[4],
            "dealer_id": 8,
        },
        {
            "name": "Kluger",
            "type": "SUV",
            "year": 2023,
            "car_make": car_make_instances[4],
            "dealer_id": 8,
        },
        # Add more CarModel instances as needed
    ]

    for data in car_model_data:
        try:
            car_model_instance = CarModel.objects.create(
                name=data['name'],
                car_make=data['car_make'],
                type=data['type'],
                year=data['year'],
                dealer_id=data['dealer_id'],
            )
            logger.info(f"Created CarModel: {data['name']} - {data['car_make'].name}")
        except Exception as e:
            logger.error(f"Error creating CarModel {data['name']}: {e}")
