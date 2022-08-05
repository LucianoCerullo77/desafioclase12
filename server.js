const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const fs = require('fs')

app.use(express.static('public'));

let productos = [{                                                                                                                                                    
    title: "Escuadra",                                                                                                                                 
    price: 10,                                                                                                                                     
    foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                     
    id: 1                                                                                                                                              
  },                                                                                                                                                   
  {                                                                                                                                                    
    title: "Calculadora",                                                                                                                              
    price: 25,                                                                                                                                     
    foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                          
    id: 2                                                                                                                                              
  },                                                                                                                                                   
  {                                                                                                                                                    
    title: "Globo Terráqueo",                                                                                                                          
    price: 40,                                                                                                                                     
    foto_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                   
    id: 3                                                                                                                                              
  }];

  // Items de ejemplo usados previamente para el desafío

let mensajes = JSON.parse(fs.readFileSync('mensajes.txt','utf-8'))

io.on('connection', function(socket){
    console.log('User connected')
    socket.emit('productos', productos)
    socket.on('newProduct', function(data){
        productos.push(data)
        io.sockets.emit('productos', productos)
    })
    socket.emit('mensajes', mensajes)
    socket.on('newMensaje', function(data){
        mensajes.push(data)
        fs.writeFileSync('mensajes.txt', JSON.stringify(mensajes))
        io.sockets.emit('mensajes', mensajes)
    })

})

const PORT = 8080

server.listen(PORT, () => {
    console.log(`Server running on Port ${srv.address().port}`)
})
server.on('error', error => console.log(`Error found in Server : ${error}`))