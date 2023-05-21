# DESAFÍO 9

DESAFÍO N°8 - Curso backend Coderhouse.

Implementación de logger

## Vistas

### Home
En la ruta "/" se presenta la pantalla inicial la cual nos muestra una bienvenida y nos permite navegar a las demas vistas.

### Products
En la ruta "/products" se veran todos los productos, la misma tambien es capaz de recibir modificadores a traves de query. Cada producto tendra un boton que nos redirigira al detalle del mismo.

### Product
Esta vista nos mostrara los detalles de los productos como la descripcion, el stock, el codigo y su ID ademas de un boton para agregar el mismo al carrito. Si el producto es de la propiedad de uno mismo o si se posee el rol de admin, aparecera un boton para eliminar el mismo.

### Create product
En esta vista los usuarios que poseen el rol de "premium" pueden crear sus propios productos.

### Cart
En ella se mostrara nuestro carrito con los productos que el mismo contiene, en este caso siendo el mismo unico del usuario.

### Purchase Ended
En ella se nos muestra los datos de la compra finalizada, dando información de los productos procesados y los que no se pudieron procesar.

### Profile
Nos muestra información sobre el perfil que esta logueado en la sesión en ese momento como el nombre, apellido, edad, rol, email.

### Login
Formulario de login, nos permite ingresar a la pagina.
Tambien se puede ingresar a traves de github.
En caso de existir una sesión activa, se nos redirige a la pagina principal de productos con nuestro usuario ya logueado.

### Register
Formulario de registro, nos permite crear una cuenta para luego loguearnos.
Tambien nos podemos registrar a traves de github, el cual nos enviara directamente a la vista de productos.
En caso de existir una sesión activa, se nos redirige a la pagina principal de productos con nuestro usuario ya logueado.

### Password reset
En esta vista se podra colocar el email de la cuenta de uno para resetear la contraseña, enviandose un email con el link para colocar la nueva.

### Create new password
Es la vista que se nos mostrara con el link que se recibe a traves del email que se nos envia al solicitar el reseteo de contraseña.

### Expired token
Es la vista que se muestra si el token que se genera para resetear la contraseña caduca.

### Errores
Ambas vistas tanto de login como register poseen una vista de error para cuando sucede algun error como que el usuario ya exista al registrarse o se ingresa algun dato erroneo al loguearse.

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
    - "/" crea un producto siempre y cuando el producto sea valido y el codigo del mismo no se repita, los datos se deben enviar a traves del body en un campo "product" acompañado de la contraseña de administrador en un campo "password". </br>
    Los datos que se envian deben ser los siguientes:
        - __title:__ String
        - __description:__ String
        - __code:__ String
        - __price:__ Number
        - __status:__ Boolean
        - __stock:__ Number
        - __category:__ String
        - __thumbnail:__ String con la url de la imagen
    
    - "/premium" crea un producto con los campos elegidos, los mismos solo podran ser creados por usuarios con el rol de "premium"


3. DELETE:
    - "/:idProduct" elimina el producto con el ID solicitado en caso de que este exista, se debe adjuntar en el body la contraseña de administrador en un campo "password".

4. PUT:
    - "/:idProduct" actualiza un producto segun el ID que se envia con los datos enviados a traves del body, en caso de que dicho producto exista, se debe adjuntar en el body la contraseña de administrador en un campo "password".

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

### Sessions

_Ruta:_ /api/sessions

1. GET:
    - "/current" devuelve la información necesaria guardada en session del usuario actual para luego utilizarla.

### Users

_Ruta:_ /users

1. POST:
    - "/login" recibe la información con la cual el usuario se quiere loguear y permite chequear si el usuario existe o no, en caso de que exista redirecciona a "/products" y crea la sesion en base de datos, en caso de que se haya producido un error o no exista nos envia a la vista de error de login.

    - "/register" recibe la informacion de un usuario al registrarse y chequea que no exista, en caso de no existir, crea el usuario y redirecciona a la vista de login, en caso de producirse un error como por ejemplo que el usuario ya exista, redirecciona a la vista de error de registro.

    - "/resetpassword" recibe la informacion de la vista para resetear la contraseña, siendo esta el email del usuario y envia un mail en el cual se envia un link temporal para resetear la contraseña del mismo.

    - "/createNewPassword" recibe la informacion de lo que se envia por la vista en la cual se crea una contraseña nueva y setea la misma al usuario, ademas de eliminar el token temporal generado.

    - "/premium/:userId" realiza un toggle al rol del usuario, si es "premium" lo devuelve a "user" y viceversa.

2. GET:
    - "/logout" nos elimina la sesión en la cual estamos logueados y la destruye en la base de datos, nos redirecciona a la vista de login

3. DELETE:
    - "/premium/:userId/products/:prodId" elimina un producto propio del usuario.

### Mailing

_Ruta:_ /mailing

1. GET:
    - "/send/:ticketId" recibe el ID del ticket por params para luego enviar un email con la información de la compra realizada.

### Mocks

_Ruta:_ api/mocks/

1. GET:
    - "/mockingproducts" devuelve productos generados a traves de la libreria faker-js, se le puede pasar por query la cantidad deseada:
        - __*quantity:*__ Cantidad de productos autogenerados que devolvera la petición, por default devuelve 100.

<br>
<br>



## Prueba en local

- Clonar el repositorio y acceder a la carpeta

```sh
git clone https://github.com/KingMacking/desafios_backend.git
cd .\Desafio_Opcional_2\
```

- Instalara dependencias e iniciar el servidor

```sh
npm i
npm start
```

Para la lectura de los productos se utiliza MongoDB, una base de datos que permite almacenar informacion en diferentes colecciones.