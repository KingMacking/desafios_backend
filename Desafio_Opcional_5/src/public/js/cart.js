const emptyCartBtn = document.querySelector('#emptyCart')
const purchaseBtn = document.querySelector('#purchase')

emptyCartBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    await fetch(`/api/carts/${user.cart}`, {
        method: 'DELETE'
    }).finally(() => {
        location.reload()
    })
})

purchaseBtn.addEventListener('click', async () => {
    const user = await fetch('/api/sessions/current').then(res => res.json())
    const ticket = await fetch(`/api/carts/${user.cart}/purchase`, {
        method: 'POST'
    }).then((data) => data.json()).then((ticket) => {
        window.location.replace(location.origin+`/purchaseEnded/${ticket._id}`)
        return ticket
    })
    await fetch(`/mailing/send/${ticket._id}`, {
        method: 'GET'
    })
})