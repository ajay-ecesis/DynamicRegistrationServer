import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import {readdirSync} from 'fs';
const morgan = require('morgan');
import cookieParser from 'cookie-parser'
import { insertImageMessage, insertTextMessage } from './controllers/messages';
require("dotenv").config();
var fileupload=require('express-fileupload')
const path = require('path')
//...

// create express app
const app = express();
const server = require('http').createServer(app)

// requiring message utitlities

const msgFormat=require('./utils/chat/message-format')
const room=require('./utils/chat/private-room')

// for socket initialization
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
})

// for socket connection

io.on('connection', socket => {

    console.log("connected socket");

//  for user joining to private chat-rooms

    socket.on('joinChat',({ senderId, receiverId }) => {

    
        // store the user to private room when user joins
        const person = room.userJoin(socket.id, senderId, receiverId)
        socket.join(receiverId,()=>{
            console.log("JOINED",person);
        })
      })


    // for getting picture message
      socket.on('image',async payload=>{

        console.log("image received on server",payload);

        // a unique combination is formed to make secure rooms
        let senderId=payload.data.sender+payload.data.receiver
let receiverId=payload.data.receiver+payload.data.sender
let formattedMessage=msgFormat.chatMessage(payload.data.pictureMessage,senderId,receiverId)
const user=room.getCurrentUser(socket.id)


if(user)
{
  let obje={
    type:'image',
     message:formattedMessage.Message,
     sender:formattedMessage.senderId,
     receiver:formattedMessage.receiverId,
     date:formattedMessage.date,
     time:formattedMessage.time 
  }

   // emitting the messsage to receiver
 let insertedMessage=await insertImageMessage(obje)
 
 console.log('this is inserted Image',insertedMessage);

io.to(user.receiver).emit('imageResponse',insertedMessage)
//  emitting message to sender
io.to(user.sender).emit('imageResponse',insertedMessage)

}

      })

    //   socket connection for sending messages to room
      socket.on('message',async payload => {

  // making a unique ID for creating room
let senderId=payload.data.sender+payload.data.receiver
let receiverId=payload.data.receiver+payload.data.sender

let formattedMessage=msgFormat.chatMessage(payload.data.message,senderId,receiverId)

// fetching current user with socketID

const user=room.getCurrentUser(socket.id)

if(user)
{
    // storing message to database
 
     let insertedMessage=await   insertTextMessage(formattedMessage)

  
       // emitting the returned messsage to receiver
       io.to(user.receiver).emit('chatResponse',insertedMessage)
       //  emitting message to sender
       io.to(user.sender).emit('chatResponse',insertedMessage)

}

      })


     

})

































// connect DB
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log('MongoDB is connected'))
.catch((err) => console.log('DB CONNECTION ERROR', err));

// apply middlewares
app.use(cors());

//serve static files
app.use(express.static('images'))
app.use('/images', express.static(path.join(__dirname,'/images')))

app.use(express.json({limit: '50mb'}));
app.use(morgan("dev"));
app.use(cookieParser())
app.use(fileupload());
// route - This func is for importing routes files automaticaly. so we dont need to import separately
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;

server.listen((port), () => console.log(`Server is running on port ${port}`));
