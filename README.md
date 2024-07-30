# E-commerce Backend API

Este proyecto es una API backend para una aplicación de comercio electrónico, diseñada para manejar autenticación, gestión de productos y otras funcionalidades. 
La API está construida utilizando Node.js y MongoDB, y está desplegada en una instancia EC2 dentro de un contenedor Docker. La API se expone a través de Amazon API Gateway.

## Arquitectura

![image](https://github.com/user-attachments/assets/c71030a3-0201-40b2-8af1-9c91f695b461)


## Tecnologías Utilizadas

![Amazon S3](https://img.shields.io/badge/Amazon_S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=aws-lambda&logoColor=white)
![Amazon API Gateway](https://img.shields.io/badge/Amazon_API_Gateway-FF4F8B?style=for-the-badge&logo=amazon-api-gateway&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white)
![CloudFront](https://img.shields.io/badge/Amazon_CloudFront-DB7093?style=for-the-badge&logo=amazon-cloudfront&logoColor=white)

- **Amazon API Gateway**: Para gestionar y exponer las API REST.
- **Amazon EC2**: Instancia donde corre la aplicación Node.js en un contenedor Docker.
- **Docker**: Para contenerizar la aplicación y asegurar la consistencia del entorno.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Amazon S3**: Para almacenar los recursos estáticos de la aplicación frontend.
- **Amazon CloudFront**: CDN para servir el contenido estático de manera eficiente.
- **CI/CD**: Integración y despliegue continuo utilizando GitHub Actions.

## Características

- **Autenticación**: Implementada en Amazon API Gateway.
- **Gestión de Productos**: Endpoints para CRUD de productos.
- **Escalabilidad**: Desplegado en EC2, puede escalar según la demanda.

## Instalación y Despliegue

### Prerrequisitos

- Node.js
- Docker
- AWS CLI configurado
- Una cuenta de AWS con permisos para EC2, S3, API Gateway, y Lambda.

### Configuración Local

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/api-ecommerce-mongodb.git
    cd api-ecommerce-mongodb
    ```

2. Instalar dependencias:
    ```bash
    npm install
    ```

3. Crear un archivo `.env` con las variables de entorno necesarias:
    ```plaintext
    MONGODB_URI=<tu-conexion-a-mongodb>
    PORT=3000
    ```

4. Construir y correr el contenedor Docker:
    ```bash
    docker build -t ecommerce-api .
    docker run -d -p 3000:3000 --name ecommerce-api ecommerce-api
    ```

### Despliegue en AWS

1. **EC2**: Crear una instancia EC2 y configurar los grupos de seguridad para permitir el tráfico en el puerto 3000.
2. **Docker en EC2**: Conectar a la instancia EC2 y correr el contenedor Docker.
    ```bash
    ssh -i "your-key.pem" ec2-user@<ec2-instance-public-dns>
    git clone https://github.com/tu-usuario/api-ecommerce-mongodb.git
    cd api-ecommerce-mongodb
    docker build -t ecommerce-api .
    docker run -d -p 3000:3000 --name ecommerce-api ecommerce-api
    ```
3. **API Gateway**: Configurar Amazon API Gateway para exponer los endpoints de tu API.
4. **Lambda (opcional)**: Configurar funciones Lambda para lógica específica.
5. **CloudFront y S3**: Desplegar la aplicación frontend en S3 y usar CloudFront para distribución.

## Uso

### Endpoints

- **GET /products**: Obtener todos los productos.
- **POST /products**: Crear un nuevo producto.
- **GET /products/:id**: Obtener un producto por ID.
- **PUT /products/:id**: Actualizar un producto por ID.
- **DELETE /products/:id**: Eliminar un producto por ID.

### Ejemplos de Uso

#### Obtener Todos los Productos

```bash
curl -X GET "https://tu-api-id.execute-api.us-east-1.amazonaws.com/prod/products"
