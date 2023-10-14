const userEmailInput = document.getElementById("user-email-input")
const messageInput = document.getElementById("message-input")
const sendMessageBtn = document.getElementById("send-message-btn")
const messagesContainer = document.getElementById("messages-container")
const newMessageForm = document.getElementById("new-message-form")

const socketCLient = io()

document.addEventListener("DOMContentLoaded", () => {
    const userEmail = prompt("Please, enter your email")
    userEmailInput.value = userEmail
})


newMessageForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    await fetch(`/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: userEmailInput.value ,      
            message: messageInput.value,
        })
    })

    socketCLient.emit("newMessageEvent")
})


socketCLient.on("newMessageEventResponse", (messages) => {
    renderProducts(messages)
})


function renderProducts(messages){
    const messagesContainer = document.getElementById("messages-container")
    messagesContainer.innerHTML = ""
    messages.forEach(message => {
        messagesContainer.insertAdjacentHTML("beforeend", `
            <li>
                <span> <b>${message.user}:</b> ${message.message} </span>
            </li>
        `)
    });
}