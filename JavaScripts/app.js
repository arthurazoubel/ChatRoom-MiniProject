// DOM queries
const chatList = document.querySelector('.chat-list')


// class instances
const chatUI = new ChatUI(chatList)
const chatRoom = new Chatroom('general', 'shaun') // here we are creating an object instance of a Chatroom class

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