
[![Español](http://ih.constantcontact.com/fs104/1115396949427/img/668.png)](https://github.com/EmprendedoresLA/emprendevs-equipo-4/blob/master/README.md)

![logo Delix](https://raw.githubusercontent.com/EmprendedoresLA/emprendevs-equipo-4/master/public/images/logo2.png)

## Delix
The easiest way to book a restaurant.

## ¿What is Delix?
Delix is a platform that brings demand predictability to restaurants, offering market information to optimize resources and reduce risk of no-shows, last minute cancelation and food waste.

Like at a movie, a concert, or a sporting event, simply pay for the experience in advance.

Unlike other systems, Delix is not an agglomeration of discounts, the application is built into each restaurant's website.

## Arquitecture
The front-end have been developed in angularJS, using the Semantic UI framwork.

The back-end is an API developed in PHP, making use of Laravel framework.

The database have been implemented in mongoDB.

## Installation
At the root of the repository, run 'composer install'.

To setup the database you should create a .env file in the root folder of the repository (see the sample file '.env.example').

In order to start the PHP's built-in development server, run 'php artisan serve'.

The front-end is in '/public/frontend/html' folder, and can see it in 'http://localhost:8000/frontend/html/home.html'.

To login into the restaurant administrator you need to create an account using 'http://localhost:8000/auth/register' and then login in 'http://localhost:8000/admin'.
