var app= require("express")()
var http= require("http").Server(app);
//const { Socket } = require("engine.io");
var path= require("path");
var io= require("socket.io")(http);

app.get("/",(req,res)=>{
    var option= {
        root: path.join(__dirname)
    }
    var filename= 'index.html';
    res.sendFile(filename,option);
})

let users= 0;

/*const nsp = io.of('/my-namespace');

nsp.on('connection', socket => {
  console.log('someone connected');
  nsp.emit('hi', 'everyone!');
});*/


io.on('connection',(socket)=>{
    console.log("a user connected");
    users++;

    io.emit('broadcast', 'everyone!');

   socket.emit("broadcast",{
        message: `hi, new user`
    })

    socket.broadcast.emit("broadcast",{
        message: `total user are ${users}`
    })
    io.sockets.emit("broadcast",{
        message: `total user are ${users}`
    })


    /*setTimeout(()=>{
        socket.send('sent message from server side to prereserve event');
    },3000)*/

    socket.on('disconnect',()=>{
        console.log('a user disconnected')

        /*io.sockets.emit("broadcast",{
            message: `total user are ${users}`
        })*/
    })
})

http.listen(8000,()=>{
    console.log(`server ready on 8000`);
})