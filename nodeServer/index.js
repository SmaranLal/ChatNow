
const io = require('socket.io')(8000, {
    cors: {
        origin: "http://192.168.101.11:5500",  // Allow frontend to connect
        methods: ["GET", "POST"]
    }
});

const users ={};

io.on('connection',socket => {
    socket.on('new-user-joined',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message , name:users[socket.id]});
    });

});