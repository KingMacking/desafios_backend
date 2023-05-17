const addToCartBtn = document.querySelector('#addToCart')
const deleteProductBtn = document.querySelector('#deleteProduct')
const prodId = document.querySelector('#prodId')

addToCartBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    const prod = await fetch(`/api/products/${prodId.innerText}`).then(res => res.json())

    if(prod.owner === user.email){
        Toastify({
            text: "No se pueden agregar productos propios al carrito",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ff0000",
            }
        }).showToast();
    } else {
        await fetch(`/api/carts/${user.cart}/product/${prodId.innerText}`,{
            method: 'POST'
        }).then(()=>{
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#0d8e3f",
                }
            }).showToast();
        })
        
    }
})

deleteProductBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    console.log(prodId.innerText);
    await fetch(`/users/premium/${user._id}/products/${prodId.innerText}`,{
        method: 'DELETE'
    }).then(() => {
        Toastify({
            text: "Producto eliminado",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#0d8e3f",
            }
        }).showToast();
    }).finally(() => {
        location.replace("http://localhost:3000/products")
    })
})