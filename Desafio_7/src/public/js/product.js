const addToCartBtn = document.querySelector('#addToCart')
const prodId = document.querySelector('#prodId')

addToCartBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    await fetch(`/api/carts/${user.cart}/product/${prodId.innerText}`,{
        method: 'POST'
    }).finally(() => {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#0d8e3f",
            }
        }).showToast();
    })
})