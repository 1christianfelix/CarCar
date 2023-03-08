# CarCar

Team:

* Brandon Moore - Services
* Christian Felix - Sales

## Design
#### Project Diagram
![Project CarCar design](https://gitlab.com/1christianfelix1/project-beta/-/raw/main/smaller%20diagram%20carcar.png)


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

<details>
<summary><strong>List Appointments Output</strong></summary>
<br>

#### Output:
```
{
	"appointments": [
		{
			"id": 2,
			"vin": "JT2BB5BA8BCBZRU2Z",
			"owner": "bob",
			"date_and_time": "2023-03-10T23:42:00+00:00",
			"technician": {
				"name": "sdfsf",
				"id": 1,
				"employee_number": 32
			},
			"reason": "sdasd",
			"vip": false,
			"finished": true
		},
		{
			"id": 3,
			"vin": "JT2BB5BA8BCBZRU2Z",
			"owner": "da",
			"date_and_time": "2023-03-03T22:51:00+00:00",
			"technician": {
				"name": "sdfsf",
				"id": 1,
				"employee_number": 32
			},
			"reason": "wqeq",
			"vip": false,
			"finished": true
		},
		{
			"id": 4,
			"vin": "JT2BB5BA8BCBZRU2Z",
			"owner": "bob",
			"date_and_time": "2023-03-08T09:53:00+00:00",
			"technician": {
				"name": "sdfsf",
				"id": 1,
				"employee_number": 32
			},
			"reason": "ewrwer",
			"vip": false,
			"finished": true
		}
	]
}
```
</details>


### Technicians:
| Action                  | Method | URL                                        |
|-------------------------|--------|--------------------------------------------|
| List Technicians        | GET    | http://localhost:8080/api/technicians/     |
| Create a Technician     | POST   | http://localhost:8080/api/technicians/     |
| Show Technician Details | GET    | http://localhost:8080/api/technicians/:id/ |

<details>
<summary><strong>List Technicians Output</strong></summary>
<br>

#### Output:
```
{
	"technicians": [
		{
			"name": "sdfsf",
			"id": 1,
			"employee_number": 32
		}
	]
}
```
</details>

<details>
<summary><strong>Create Technician Input/Output</strong></summary>
<br>

#### Input:
```
{
	"name": "bob",
	"employee_number": 1891
}
```

#### Output:
```
{
	"name": "bob",
	"id": 2,
	"employee_number": 1891
}
```
</details>

<details>
<summary><strong>Show Technicians Details Output</strong></summary>
<br>

#### Output:
```
{
	"name": "sdfsf",
	"id": 1,
	"employee_number": 32
}
```
</details>


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
Every model in the back-end has a relationship with the Sales Record model. The sales service also utilizes data from the inventory service in order to create relationships between sales records and automobiles. This data was fetched through polling, uniquely identified by VIN numbers and associated with an Automobile Value Object within the Sales microservices. 

For each model, there exist a view to create, delete, and list.
 

 ### RestFul API (PORT 8090):
 #### Sales Person:
| Action                | Method | URL                                         |
|-----------------------|--------|---------------------------------------------|
| List Sales People     | GET    | http://localhost:8090/api/sales_person/     |
| Create a Sales Person | POST   | http://localhost:8090/api/sales_person/     |
| Delete a Sales Person | DELETE | http://localhost:8090/api/sales_person/:id/ |

<details>
<summary><strong>List Sales People Output</strong></summary>
<br>

#### Output:
```
{
	"sales_people": [
		{
			"href": "/api/sales_person/1/",
			"name": "Christian Felix",
			"employee_number": "1"
		},
		{
			"href": "/api/sales_person/2/",
			"name": "Jeff",
			"employee_number": "2"
		},
    ]
}
```
</details>

<details>
<summary><strong>Create Sales People Input/Output</strong></summary>
<br>

#### Input:
```
{
	"name": "Daveip",
	"employee_number": "4"
}
```
#### Output:
```
{
	"href": "/api/sales_person/4/",
	"name": "Daveip",
	"employee_number": "4"
}
```
</details>

<details>
<summary><strong>Delete Sales Person Output</strong></summary>
<br>

#### Output:
```
{
	"Deleted": true
}
```
</details>


### Customer
| Action            | Method | URL                                   |
|-------------------|--------|---------------------------------------|
| List Customers    | GET    | http://localhost:8090/api/customer/   |
| Create a Custom   | POST   | http://localhost:8090/api/customer/   |
| Delete a Customer | DELETE | http://localhost:8090/api/customer/:id/ |

<details>
<summary><strong>List Customer Output</strong></summary>
<br>

#### Output:
```
{
	"customers": [
		{
			"href": "/api/customer/1/",
			"name": "John John",
			"address": "1",
			"phone_number": "111-222-3333"
		},
		{
			"href": "/api/customer/2/",
			"name": "Kyle",
			"address": "123 Kyle's house",
			"phone_number": "123-123-1234"
		},
		{
			"href": "/api/customer/3/",
			"name": "billy",
			"address": "2",
			"phone_number": "111-222-3333"
		}
	]
}
```
</details>

<details>
<summary><strong>Create Customer Input/Output</strong></summary>
<br>

#### Input:
```
{
	"name": "billy",
	"address": "2 house",
	"phone_number": "111-222-3333"
}
```
#### Output:
```
{
	"href": "/api/customer/3/",
	"name": "billy",
	"address": "2 house",
	"phone_number": "111-222-3333"
}
```
</details>

<details>
<summary><strong>Delete Sales Person Output</strong></summary>
<br>

#### Output:
```
{
	"Deleted": true
}
```
</details>



### Sales Record
| Action              | Method | URL                                          |
|---------------------|--------|----------------------------------------------|
| List Sales Records  | GET    | http://localhost:8090/api/sales_records/     |
| Create Sales Record | POST   | http://localhost:8090/api/sales_records/     |
| Delete Sales Record | DELETE | http://localhost:8090/api/sales_records/:id/ |

<details>
<summary><strong>List Sales Records Output</strong></summary>
<br>

#### Output:
```
{
	"sales_records": [
		{
			"href": "/api/sales_records/12/",
			"sale_price": "1000",
			"sales_person": {
				"href": "/api/sales_person/1/",
				"name": "Christian Felix",
				"employee_number": "1"
			},
			"customer": {
				"href": "/api/customer/1/",
				"name": "John John",
				"address": "1",
				"phone_number": "111-222-3333"
			},
			"automobile": {
				"import_href": "/api/automobiles/2C3CCAFJ7CH100286/",
				"color": "black",
				"year": 2023,
				"vin": "2C3CCAFJ7CH100286",
				"sold": true
			}
		},
		{
			"href": "/api/sales_records/13/",
			"sale_price": "6",
			"sales_person": {
				"href": "/api/sales_person/1/",
				"name": "Christian Felix",
				"employee_number": "1"
			},
			"customer": {
				"href": "/api/customer/1/",
				"name": "John John",
				"address": "1",
				"phone_number": "111-222-3333"
			},
			"automobile": {
				"import_href": "/api/automobiles/3C3CCAFJ7CH100286/",
				"color": "black",
				"year": 2020,
				"vin": "3C3CCAFJ7CH100286",
				"sold": true
			}
		},
    ]
}
```
</details>

<details>
<summary><strong>Create Sales Record Input/Output</strong></summary>
<br>

#### Input:
```
{
	"sale_price": "40000",
	"sales_person": "Jeff",
	"customer": "billy",
	"automobile": "8y7u7y7u7y7u7y7u7"
}
```
#### Output:
```
{
	"href": "/api/sales_records/23/",
	"sale_price": "40000",
	"sales_person": {
		"href": "/api/sales_person/2/",
		"name": "Jeff",
		"employee_number": "2"
	},
	"customer": {
		"href": "/api/customer/3/",
		"name": "billy",
		"address": "2",
		"phone_number": "111-222-3333"
	},
	"automobile": {
		"import_href": "/api/automobiles/8y7u7y7u7y7u7y7u7/",
		"color": "teal",
		"year": 1988,
		"vin": "8y7u7y7u7y7u7y7u7",
		"sold": true
	}
}
```
</details>

<details>
<summary><strong>Delete Sales Record Output</strong></summary>
<br>

#### Output:
```
{
	"Deleted": true
}
```
</details>

## Inventory
### General Overview
The inventory service provides users the ability to create/update, delete, list, and view details for Manufacturers, VehicleModels, and Automobiles.

#### Manufacturers
<table>
<thead>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td>List manufacturers</td>
<td>GET</td>
<td><code tabindex="0">http://localhost:8100/api/manufacturers/</code></td>
</tr>
<tr>
<td>Create a manufacturer</td>
<td>POST</td>
<td><code tabindex="0">http://localhost:8100/api/manufacturers/</code></td>
</tr>
<tr>
<td>Get a specific manufacturer</td>
<td>GET</td>
<td><code tabindex="0">http://localhost:8100/api/manufacturers/:id/</code></td>
</tr>
<tr>
<td>Update a specific manufacturer</td>
<td>PUT</td>
<td><code tabindex="0">http://localhost:8100/api/manufacturers/:id/</code></td>
</tr>
<tr>
<td>Delete a specific manufacturer</td>
<td>DELETE</td>
<td><code tabindex="0">http://localhost:8100/api/manufacturers/:id/</code></td>
</tr>
</tbody>
</table>

<details>
<summary><strong>Create and Update Manufacturer Input</strong></summary>
<br>

#### Input:
```
{
  "name": "Chrysler"
}
```
</details>

<details>
<summary><strong>Create, Update, Getting a specific Manufacturer Output</strong></summary>
<br>

#### Output:
```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```
</details>


<details>
<summary><strong>Listing Manufacturer Output</strong></summary>
<br>

#### Input:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```
</details>

#### VehicleModels
<table>
<thead>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td>List vehicle models</td>
<td>GET</td>
<td><code tabindex="0">http://localhost:8100/api/models/</code></td>
</tr>
<tr>
<td>Create a vehicle model</td>
<td>POST</td>
<td><code tabindex="0">http://localhost:8100/api/models/</code></td>
</tr>
<tr>
<td>Get a specific vehicle model</td>
<td>GET</td>
<td><code tabindex="0">http://localhost:8100/api/models/:id/</code></td>
</tr>
<tr>
<td>Update a specific vehicle model</td>
<td>PUT</td>
<td><code tabindex="0">http://localhost:8100/api/models/:id/</code></td>
</tr>
<tr>
<td>Delete a specific vehicle model</td>
<td>DELETE</td>
<td><code tabindex="0">http://localhost:8100/api/models/:id/</code></td>
</tr>
</tbody>
</table>

<details>
<summary><strong>Create and Update Vehicle Input</strong></summary>
<br>

#### Input:
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```
</details>

<details>
<summary><strong>Updating a Vehicle Input</strong></summary>
<br>

#### Input:
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
</details>

<details>
<summary><strong>Create, Update, Getting a specific Vehicle Model Output</strong></summary>
<br>

#### Output:
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
</details>

<details>
<summary><strong>Listing Vehicle Model Output</strong></summary>
<br>

#### Output:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```
</details>


<table class="">
<thead>
<tr>
<th>Action</th>
<th>Method</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td>List automobiles</td>
<td>GET</td>
<td><code tabindex="0">http://localhost:8100/api/automobiles/</code></td>
</tr>
<tr>
<td>Create an automobile</td>
<td>POST</td>
<td><code tabindex="0">http://localhost:8100/api/automobiles/</code></td>
</tr>
<tr>
<td>Get a specific automobile</td>
<td>GET</td>
<td><code tabindex="0">http://localhost:8100/api/automobiles/:vin/</code></td>
</tr>
<tr>
<td>Update a specific automobile</td>
<td>PUT</td>
<td><code tabindex="0">http://localhost:8100/api/automobiles/:vin/</code></td>
</tr>
<tr>
<td>Delete a specific automobile</td>
<td>DELETE</td>
<td><code tabindex="0">http://localhost:8100/api/automobiles/:vin/</code></td>
</tr>
</tbody>
</table>

<details>
<summary><strong>Creating an Automobile Input</strong></summary>
<br>

#### Input:
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
</details>

<details>
<summary><strong>Getting Details of an Automobile Output</strong></summary>
<br>

#### Output:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
</details>

<details>
<summary><strong>Updating an Automobile Input</strong></summary>
<br>

#### Input:
```
{
  "color": "red",
  "year": 2012
}
```
</details>

<details>
<summary><strong>Listing Automobiles Output</strong></summary>
<br>

#### Output:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```
</details>

