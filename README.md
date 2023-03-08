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

 ### RestFul API (PORT 8080):
 #### Appointments
| Action                   | Method | URL                                                     |
|--------------------------|--------|---------------------------------------------------------|
| List All Appointments    | GET    | http://localhost:8080/api/appointments/                 |
| List Appointments by VIN | GET    | http://localhost:8080/api/appointments/<str:vin>/       |
| Create Appointment       | POST   | http://localhost:8080/api/appointments/<str:vin>/       |
| Delete Appointment       | DELETE | http://localhost:8080/api/appointments/detail/<int:id>/ |
| Update Appointment       | PUT    | http://localhost:8080/api/appointments/detail/<int:id>/ |
| Show Appointment Details | GET    | http://localhost:8080/api/appointments/detail/<int:id>/ |


### Technicians:
| Action                  | Method | URL                                        |
|-------------------------|--------|--------------------------------------------|
| List Technicians        | GET    | http://localhost:8080/api/technicians/     |
| Create a Technician     | POST   | http://localhost:8080/api/technicians/     |
| Show Technician Details | GET    | http://localhost:8080/api/technicians/:id/ |



## Sales microservice
### General Overview
The sales application allows users to manage and view data surrounding sales:
- Add Customers and new Sales People through forms
- Record and track the history of sales between Customer, Sales Person, and the Automobile
- Filter the history of sales records by sales person

#### Front-End
The front-end interface of the Sales service provides the user with forms to add Sales People, Customers, and create Sale Records. Some forms contain dropdown menus that allow the user to identify and use known records.  

The user also has access to view a detailed list of all sales records or records by a certain sales person.

#### Back-End
Every model in the back-end has a relationship with the Sales Record model. The sales service also utilizes data from the inventory service in order to create relationships between sales records and automobiles. This data was fetched through polling and uniquely identified by VIN numbers. 

For each model, there exist a view to create, delete, and list.
 

 ### RestFul API (PORT 8090):
 #### Sales Person:
| Action                | Method | URL                                         |
|-----------------------|--------|---------------------------------------------|
| List Sales People     | GET    | http://localhost:8090/api/sales_person/     |
| Create a Sales Person | POST   | http://localhost:8090/api/sales_person/     |
| Delete a Sales Person | DELETE | http://localhost:8090/api/sales_person/:id/ |

### Customer
| Action            | Method | URL                                   |
|-------------------|--------|---------------------------------------|
| List Customers    | GET    | http://localhost:8090/api/customer/   |
| Create a Custom   | POST   | http://localhost:8090/api/customer/   |
| Delete a Customer | DELETE | http://localhost:8090/api/customer/:id/ |


### Sales Record
| Action              | Method | URL                                          |
|---------------------|--------|----------------------------------------------|
| List Sales Records  | GET    | http://localhost:8090/api/sales_records/     |
| Create Sales Record | POST   | http://localhost:8090/api/sales_records/     |
| Delete Sales Record | DELETE | http://localhost:8090/api/sales_records/:id/ |


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
