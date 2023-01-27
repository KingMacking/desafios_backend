# API REST

Primer preentrega proyecto final, curso Back End de Coderhouse.

Se crea un servidor en el puerto 8080 con express con las siguentes funcionalidades:

## PRODUCTS
_Ruta:_ /api/products

1. GET:
    - "/" devuelve todos los productos, se puede aplicar un __***limit***__ el cual nos devuelve el numero de productos especificados.
    - "/:idProduct" nos devuelve el producto con el ID especificado, en caso de que el mismo exista.

2. POST:
    - "/" crea un producto siempre y cuando el producto sea valido y el codigo del mismo no se repita, los datos se deben enviar a traves del body.
    
    Los datos que se envian deben ser los siguientes:
        - title: String
        - description: String
        - code: String
        - price: Number
        - status: Boolean
        - stock: Number
        - category: String
        - thumbnails: Array de strings que contengan las rutas donde se almacenan las imagenes del producto


3. DELETE:
    - "/:idProduct" elimina el producto con el ID solicitado en caso de que este exista.

4. PUT:
    - "/:idProduct" actualiza un producto segun el ID que se envia con los datos enviados a traves del body, en caso de que dicho producto exista y que el codigo enviado en el body no se repita.

## CARTS
_Ruta:_ /api/carts

1. GET:
    - "/:cartId" devuelve los productos que se encuentran dentro de un carrito en caso de que este exista.

2. POST:
    - "/" crea un carrito con un ID unico y un array de productos vacio.
    - "/:cartId/product/:productID" agrega un producto al array de productos el cual contiene el ID del producto agregado y la cantidad, esta ultima comienza siempre en 1 y si el producto a agregar ya existe se le suma 1.


### Funcionamiento

- Instalar las dependencias e iniciar el servidor
```sh
npm i
npm start
```

Para la lectura de los productos se utiliza el módulo fs nativo de node, el cual trae los productos desde un archivo 'products.json' y los carritos desde el archivo 'carts.json'.
