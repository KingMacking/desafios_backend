# INCORPORACION DE PERSISTENCIA ATRAVES DE MONGODB

Desafio Opcional N° 1 - Curso backend Coderhouse.

Se conecta MongoDB al proyecto como opción de persistencia de datos

## Home
En la ruta "/" se presenta la pantalla inicial la cual nos muestra un chat en el cual se puede hablar en vivo.

Si se desea ver a traves de algun cliente como Postman o ThunderClient los mensajes, simplemente hay que realizar una peticón de tipo "GET" a "/messages".

## Products

_Ruta:_ /products

1. GET:
    - "/" devuelve todos los productos, se puede aplicar un __***limit***__ el cual nos devuelve el numero de productos especificados.
    - "/:idProduct" nos devuelve el producto con el ID especificado, en caso de que el mismo exista.

2. POST:
    - "/" crea un producto siempre y cuando el producto sea valido y el codigo del mismo no se repita, los datos se deben enviar a traves del body. </br>
    Los datos que se envian deben ser los siguientes:
        - title: String
        - description: String
        - code: String
        - price: Number
        - status: Boolean
        - stock: Number
        - category: String
        - thumbnails: String con la url de la imagen


3. DELETE:
    - "/:idProduct" elimina el producto con el ID solicitado en caso de que este exista.

4. PUT:
    - "/:idProduct" actualiza un producto segun el ID que se envia con los datos enviados a traves del body, en caso de que dicho producto exista.

## Carts

_Ruta:_ /carts

1. GET:
    - "/:cartId" devuelve los productos que se encuentran dentro de un carrito en caso de que este exista.

2. POST:
    - "/" crea un carrito con un ID unico y un array de productos vacio.
    - "/:cartId/product/:productID" agrega un producto al array de productos el cual contiene el ID del producto agregado y la cantidad, esta ultima comienza siempre en 1 y si el producto a agregar ya existe se le suma 1.

## Prueba en local

- Clonar el repositorio y acceder a la carpeta

```sh
git clone https://github.com/KingMacking/desafios_backend.git
cd .\Desafio_Opcional_1\
```

- Instalara dependencias e iniciar el servidor

```sh
npm i
npm start
```

Para la lectura de los productos se utiliza MongoDB, una base de datos que permite almacenar informacion en diferentes colecciones.