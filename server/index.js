require('dotenv').config('')
const session = require('express-session')
const express = require("express");
const app = express();
const c = require("./controller");
const ac = require('./authController')
const massive = require('massive')
const {sessionCheck} = require('./authMiddleware')
const {SERVER_PORT, SECRET_SESSION, CONNECTION_STRING} = process.env


app.use(express.json());
app.use(session({
    secret: SECRET_SESSION,
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 36
    }
}))

app.post('/auth/login', ac.login)
app.get('/api/admins',sessionCheck, ac.getAllAdmin)
app.get('/api/session',sessionCheck , ac.loggedInCheck)
app.delete('/api/logout', ac.logout)


massive(CONNECTION_STRING).then(db =>{
    app.set('db',db)
    const io = require("socket.io")(
      app.listen(SERVER_PORT, () => console.log(`server is all good on ${SERVER_PORT}`))
    );

    io.on("connection", socket => {
        const db = app.get('db')
      socket.on("message to server", body => c.messageToServer(body, io, socket, db,session))
      socket.on('join', body=> c.checkForChatroom(socket, io, body, db,session))
    });

})


