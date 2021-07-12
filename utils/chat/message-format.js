let moment = require('moment')
module.exports={
    chatMessage:(msg,senderId,receiverId)=>
    {
        let userData={}
        let d = new Date()
        let date= moment(d).format('YYYY-MM-DD')
        let time= moment(d).format('hh:mm:a')
        let first = senderId.length - 24;
        senderId=senderId.slice(0, first);
        receiverId=receiverId.slice(0,first);
        userData={
            Message:msg, 
            senderId:senderId,
            receiverId:receiverId,
            date:date,
            time:time,
        }
        return userData
        
    }
}