[![English](http://sell.judaskissmovie.com/wp-content/uploads/2012/11/English-Button.jpg)](https://github.com/EmprendedoresLA/emprendevs-equipo-4/blob/master/readme.eng.md)

![logo Delix](https://raw.githubusercontent.com/EmprendedoresLA/emprendevs-equipo-4/master/public/images/logo2.png)

## Delix
Hacemos de su restaurante un negocio previsible.

## ¿Que es Delix?
Delix es una plataforma que le permite prever la demanda, mejorar el flujo de caja y reducir pérdidas por clientes que no se presentan o cancelan a ultimo minuto.

Cenar en su restaurante es más que una simple comida, es una entretenimiento, y al igual que una obra de teatro, un recital o un concierto, simplemente se paga la experiencia por adelantado.

A diferencia de otros sistemas, Delix no es una aglomeración de promociones, sino que la aplicación se encuentra integrada a la página web de su restaurante.

## Arquitectura
El front-end se encuentra desarrollado en angularJS, usando el framework Semantic UI.

El back-end es un API desarrollada en PHP, sirviéndose del framework Laravel.

El administrador del restaurante también se ha realizado con Laravel y Angularjs.

Implementamos mongoDB como gestor de base de datos.

## Instalación
En el directorio raíz del repositorio, ejecutar 'composer install'.

Se debe crear un archivo .env en el directorio raíz del repositorio para configurar la base de datos MongoDb (ver el archivo de ejemplo '.env.example').

Luego, para correr el servidor de desarrollo se debe ejecutar el comando 'php artisan serve'.

El front-end se encuentra en el directorio '/public/frontend/html', y puede verlo en 'http://localhost:8000/frontend/html/home.html'.

Para ingresar al backend primero debe registrarse en 'http://localhost:8000/auth/register' y luego ingresar a 'http://localhost:8000/admin'.

