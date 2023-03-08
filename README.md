# CarCar

Team:

* Brandon Moore - Services
* Christian Felix - Sales

## Design

![Project CarCar Design](https://gitlab.com/1christianfelix1/project-beta/-/raw/main/project%20beta%20excalidraw.png)

## Service microservice

Explain your models and integration with the inventory
microservice, here.

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
