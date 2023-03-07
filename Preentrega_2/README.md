# PREENTREGA PROYECTO FINAL

PREENTREGA PROYECTO FINAL N° 2 - Curso backend Coderhouse.

Profecionalizacion de las rutas y vistas

## Vistas

### Home
En la ruta "/" se presenta la pantalla inicial la cual nos muestra una bienvenida y nos permite navegar a las demas vistas.

### Products
En la ruta "/products" se veran todos los productos, la misma tambien es capaz de recibir modificadores a traves de query. Cada producto tendra un boton que nos redirigira al detalle del mismo.

### Product
Esta vista nos mostrara los detalles de los productos como la descripcion, el stock, el codigo y su ID ademas de un boton para agregar el mismo al carrito.

### Cart
En ella se mostrara nuestro carrito con los productos que el mismo contiene

## Rutas

### Products

_Ruta:_ /api/products

1. GET:
    - "/" devuelve todos los productos, se pueden aplicar distintas querys:
        - __*sort:*__ Ordena por precio los productos segun el filtro dado (No aplicado por defecto). </br>
        Las opciones pueden ser:
            - *asc* 
            - *desc* 
            - *ascending*
            - *ascending*
            - *1*
            - *-1*
        - __*limit:*__ Limita el numero de objetos que podemos ver por página (10 por defecto).
        - __*page:*__ Nos muestra la pagina que le indiquemos (1 por defecto).
        - __*category:*__ Nos muestra los productos pertenecientes a la categoria especificada (No aplicado por defecto).
        - __*status:*__ Nos muestra productos segun si tienen o no stock (No aplicado por defecto). </br>
        Las opciones son:
            - __true:__ Nos muestra solo productos que tengan stock
            - __false:__ Nos muestra solo productos que no tengan stock
    - "/:idProduct" nos devuelve el producto con el ID especificado, en caso de que el mismo exista.

2. POST:
    - "/" crea un producto siempre y cuando el producto sea valido y el codigo del mismo no se repita, los datos se deben enviar a traves del body. </br>
    Los datos que se envian deben ser los siguientes:
        - __title:__ String
        - __description:__ String
        - __code:__ String
        - __price:__ Number
        - __status:__ Boolean
        - __stock:__ Number
        - __category:__ String
        - __thumbnails:__ String con la url de la imagen


3. DELETE:
    - "/:idProduct" elimina el producto con el ID solicitado en caso de que este exista.

4. PUT:
    - "/:idProduct" actualiza un producto segun el ID que se envia con los datos enviados a traves del body, en caso de que dicho producto exista.

### Carts

_Ruta:_ /api/carts

1. GET:
    - "/" devuelve todos los carritos que hay, los productos que poseen muestran toda la información gracias al metodo "populate".

    - "/:cartId" devuelve los productos que se encuentran dentro de un carrito en caso de que este exista, los productos que posee muestran toda la información gracias al metodo "populate".

2. POST:
    - "/" crea un carrito con un ID unico y un array de productos vacio.

    - "/:cartId/product/:productID" agrega un producto al array de productos el cual contiene el ID del producto agregado y la cantidad, esta ultima comienza siempre en 1 y si el producto a agregar ya existe se le suma 1.

3. PUT:
    - "/:cartId" agrega un array de productos al carrito especificado en caso de que este exista, el array de productos debe pasarse por "body" y tener el siguiente formato:
    ```
    [
        {
            _id: 1a2b3c4d5,
            quantity: 1
        },
        {
            _id: 5e4d3c2b1a,
            quantity: 10
        }
    ]
    ```

    - "/:cartId/products/:prodId" sirve para actualiar la cantidad de un producto que se encuentra dentro de un carrito, la cantidad nueva debe ser enviada por "body" y tener el siguiente formato:
    ```
    {quantity: 10}
    ```

4. DELETE:
    - "/:cartId/products/:prodId" Elimina un producto que se encuentra dentro de un carrito.

    - "/:cartId" Elimina todos los productos que se encuentran en un carrito.


## Prueba en local

- Clonar el repositorio y acceder a la carpeta

```sh
git clone https://github.com/KingMacking/desafios_backend.git
cd .\Preentrega_2\
```

- Instalara dependencias e iniciar el servidor

```sh
npm i
npm start
```

Para la lectura de los productos se utiliza MongoDB, una base de datos que permite almacenar informacion en diferentes colecciones.