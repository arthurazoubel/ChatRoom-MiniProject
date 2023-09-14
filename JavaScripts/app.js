// DOM queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateNameMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim()
    chatRoom.addChat(message)
        .then(() => {newChatForm.reset()})
        .catch(err => console.log(err))
})


// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newUsername = newNameForm.name.value.trim()
    chatRoom.updateName(newUsername)
    newNameForm.reset()
    updateNameMssg.innerText = `Your name was updated to ${newUsername}`
    setTimeout(() => {updateNameMssg.innerText = ''}, 3000)
})

// update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatRoom.updateRoom(e.target.getAttribute('id'));
        chatRoom.getChats(chat => chatUI.render(chat))
    }
})


// check localStorage for a username
const username = localStorage.username ? localStorage.username : 'anonymous'


// class instances
const chatUI = new ChatUI(chatList)
const chatRoom = new Chatroom('general', username) // here we are creating an object instance of a Chatroom class

/*
// and here I'm calling the method addChat from the Chatroom class, passing a message as an argument
chatRoom.addChat('is this the real deal?')
// since it returns a promise, I need to tackle the then() method
.then(() => {console.log('chat added')})
.catch(err => console.log(err))
*/

// get the chats and render
chatRoom.getChats(data => {
    chatUI.render(data)
})