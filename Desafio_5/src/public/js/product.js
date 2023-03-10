const addToCartBtn = document.querySelector('#addToCart')
const prodId = document.querySelector('#prodId')

addToCartBtn.addEventListener('click', () => {
    fetch(`/api/carts/6403c61b5c08e4d7fc0e342d/product/${prodId.innerText}`,{
        method: 'POST'
    }).finally((res) => {
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