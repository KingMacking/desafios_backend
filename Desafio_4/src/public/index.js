const socketClient = io()

const productForm = document.getElementById('productForm');
const productDeleteForm = document.getElementById('productDeleteForm')

productForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(productForm)

    fetch('/api', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    socketClient.emit('updateProducts')
})

productDeleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(productDeleteForm)

    fetch('/api', {
        method: 'DELETE',
        body: formData
    })
    .then(res => res.json())
    socketClient.emit('updateProducts')
})

socketClient.on('fetchProducts', () => {
    fetch('/api', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(products => {
        console.log(products);
        let realTimeProductList = document.getElementById('realTimeProductList')
        console.log(realTimeProductList);
        let productList = products.map(prod => {
            return `<h3>${prod.title}</h3>
                    <p>${prod.category}</p>
                    <p>Descripcion:${prod.description}</p>
                    <p>Precio: $ ${prod.price}</p>
                    <p>Codigo: ${prod.code}</p>
                    <p>Stock: ${prod.stock}</p>
                    <p>ID: ${prod.id}</p>
                    <img src=${prod.thumbnail} alt="product image"></img>`
        }).join(' ')
        console.log(productList);
        realTimeProductList.innerHTML = productList
        console.log(realTimeProductList);
    })
})