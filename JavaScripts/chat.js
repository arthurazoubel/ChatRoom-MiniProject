// adding new chat docs
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.unsub;
        this.chats = db.collection('chats')
    }
    async addChat(message) {   // an add chat method for the class -> (think of it as a regular function if it were outside of a class)
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback) {
        this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                change.type === 'added' ? callback(change.doc.data()) : null;
            })
        })
    }

    updateName(username) {
        this.username = username;

    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated')
        if(this.unsub) {
            this.unsub()
        }
    }
}