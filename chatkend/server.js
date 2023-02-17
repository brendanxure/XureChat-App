const express = require('express')
const app = express();
const userRoutes = require('./Routes/userRoutes')

const rooms = ['general', 'tech', 'finance', 'crypto']
const cors = require('cors');
const DBConnect = require('./connection');
const Message = require('./Model/Message');
const User = require('./Model/User');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)

DBConnect()

const server = require('http').createServer(app)
const PORT = 5001
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

app.get('/rooms', (req, res) => {
    res.json(rooms)
})

const getLastMessagesFromRoom = async(room) => {
    let roomMessages = await Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: "$date", messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages;
}

const sortRoomMessagesByDate = (messages) => {
    return messages.sort(function(a, b){
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date1[2] + date1[0] + date1[1]
        
        return date1 < date2 ? 1 : 0
    })
}

// socket connection

io.on('connection', (socket)=> {

    socket.on('new-user', async ()=> {
        const members = await User.find();
        io.emit('new-user', members)
    })

    socket.on('join-room', async(room, previousRoom) => {
        socket.join(room);
        socket.leave(previousRoom)
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages)

    })

    socket.on('message-room', async(room, content, sender, time, date) => {
        console.log('new message', content);
        const newMessage = await Message.create({content, from: sender, time, date, to: room});
        console.log(newMessage)
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        // sending message to room
        io.to(room).emit('room-messages', roomMessages)

        socket.broadcast.emit('notifications', room)
    })

    app.delete("/logout", async(req, res)=> {
        try {
            const {_id, newMessage} = req.body;
            const user = await User.findById(_id);
            user.status = "offline";
            user.newMessage = newMessage;
            await user.save();
            const members = await User.find();
            socket.broadcast.emit("new-user", members);
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(400).send()
        }
    })

})

server.listen(PORT, ()=> {
    console.log('Listening to port', PORT)
})