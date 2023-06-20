const deleteBtn = document.querySelector('#deleteUser')
const setUserBtn = document.querySelector('#setUser')
const setPremiumBtn = document.querySelector('#setPremium')
const userId = document.querySelector('#userId')

deleteBtn.addEventListener('click', async () => {
    await fetch(`/users/${userId.innerText}`,{
        method: 'DELETE'
    })
    .finally(() => {
        window.location.replace(location.origin+`/usersList`)
    })
})

if(setUserBtn) {
    setUserBtn.addEventListener('click', async () => {
        await fetch(`/users/premium/${userId.innerText}`,{
            method: 'POST'
        })
        .finally(() => {
            location.reload()
        })
    })
}

if(setPremiumBtn){
    setPremiumBtn.addEventListener('click', async () => {
        await fetch(`/users/premium/${userId.innerText}`,{
            method: 'POST'
        })
        .finally(() => {
            location.reload()
        })
    })
}