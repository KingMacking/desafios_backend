const socketClient = io()

const greetingTitle = document.querySelector('#greeting')
const chatForm = document.querySelector('#chatForm')
const chatArea = document.querySelector('#chatMessages')
const chatMessage = document.querySelector('#message')

let user = null

if(!user){
    Swal.fire({
        title: 'Bienvenido al chat de la pagina',
        text: 'Ingresa tu email',
        input: 'email',
        inputPlaceholder: 'Ingresa tu email',
        inputValidator: (value) => {
            if(!value){
                return 'Debes ingresar tu email para poder continuar'
            }
        }
    }).then(email => {
        user = email.value
        greetingTitle.innerText = user
    })
}

chatForm.addEventListener('submit',(e) => {
    e.preventDefault()
    let formData = new FormData(chatForm)

    chatMessage.value = ''
    fetch('/messages', {
        method: "POST",
        body: formData
    }).then(() => {
        socketClient.emit('newMessage')
    })
})

socketClient.on('fetchMessages', () => {
    fetch('/messages', {
        method: "GET"
    })
    .then(res => res.json())
    .then(messages =>{
        let messageList = messages.map(message => {
            return `<p>${message.user}: ${message.message}</p>`
        }).join(' ')
        console.log(messageList);
        chatArea.innerHTML = messageList
        console.log(chatArea);
    })
})