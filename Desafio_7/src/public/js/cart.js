const emptyCartBtn = document.querySelector('#emptyCart')

emptyCartBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    await fetch(`/api/carts/${user.cart}`, {
        method: 'DELETE'
    }).finally(() => {
        location.reload()
    })
})