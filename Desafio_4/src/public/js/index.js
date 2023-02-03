const socketClient = io()

const newProductForm = document.querySelector('#newProductForm')

newProductForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const productData = new FormData(newProductForm)
    fetch('/realtimeproducts', {
        method: 'POST',
        body: productData
    })
})

socketClient.on('getProducts', ()=>{
    fetch('/', {
        method: 'GET'
    })
    .then(res=>res.json())
    .then(products=> {
        const productTemplate = document.querySelector('#productTemplate').innerHTML
        const compiledProductTemplate = Handlebars.compile(productTemplate)
        document.querySelector('#productsList').innerHTML = compiledProductTemplate(products)
    })
})