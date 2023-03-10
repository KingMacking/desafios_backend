const emptyCartBtn = document.querySelector('#emptyCart')

emptyCartBtn.addEventListener('click', () => {
    fetch('/api/carts/6403c61b5c08e4d7fc0e342d', {
        method: 'DELETE'
    }).finally(() => {
        location.reload()
    })
})