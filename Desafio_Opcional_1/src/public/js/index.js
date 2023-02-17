const socketClient = io()

const greetingTitle = document.querySelector('#greeting')
const chatForm = document.querySelector('#chatForm')
const chatArea = document.querySelector('#chatMessages')
const chatMessage = document.querySelector('#message')

let user = null

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
        chatArea.innerHTML = messageList
    })
})