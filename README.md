# CarCar

Team:

* Brandon Moore - Services
* Christian Felix - Sales

## Design
#### Project Diagram
![Project CarCar design](https://gitlab.com/1christianfelix1/project-beta/-/raw/main/smaller%20diagram%20carcar.png)


## Service microservice
### General Overview

This application serves the purpose of:  
- Managing and tracking automobile service appointments
- Providing user with the ability to create appointments through a user-friendly form
- View a comprehensive list of scheduled appointments

#### Front-End
On the front-end, users can also access features to mark appointments as canceled or completed and add information related to technicians via a dedicated form. In addition, the application offers a service history view.

#### Back-End
The back-end functionality encompasses creating appointments and technicians, along with persisting their details.  

To further enhance the user experience, the application integrates with an inventory microservice that leverages the VIN to verify whether the automobile has been sold by the dealership.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

## How to run the application

1. Clone the repository:  
https://gitlab.com/1christianfelix1/project-beta

2. Run Docker and run the following commands to build and start the Docker container
```
docker volume create beta-data
docker-compose build
docker-compose up

```
3. Make and apply migrations
```
docker exec -it «api-container-name» bash
python manage.py makemigrations
python manage.py migrate

```
4. Once everything is loaded, you can view the application at:  
http://localhost:3000/
