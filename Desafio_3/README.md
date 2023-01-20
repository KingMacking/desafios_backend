# servidor-express-BEcoder

Desafío de clase 6, curso Back End de Coderhouse.

Se crea un servidor en el puerto 8080 con express con las siguentes funcionalidades:

1. Ruta get '/productos' devuelve un array con todos los productos disponibles en el servidor

2. Ruta get '/producto?limit=NUMBER' una cantidad de productos definida por el numero que se ingresa.

2. Ruta get '/producto/:idProduct' devuelve un producto filtrado por su ID unico.

Para la lectura de los productos se utiliza el módulo fs nativo de node, el cual trae los productos desde un archivo 'productos.json'.
