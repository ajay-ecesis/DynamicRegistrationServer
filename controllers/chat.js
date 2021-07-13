import chat from '../models/chat'
import User from '../models/user'
import { ObjectID } from 'bson'





export const getMyMessages = async(req,res)=>{

    console.log('my',req.body);
    try{
        
        // let sendmessages=await Message.find({$and:[{sender:req.body.senderId},{receiver:req.body.receiverId}]}).sort({_updatedAt:'asc'}).exec();

        // let receivedMessages=await Message.find({$and:[{sender:req.body.receiverId},{receiver:req.body.senderId}]}).sort({_updatedAt:'asc'}).exec();

        // let message=sendmessages+receivedMessages

        return res.status(400).send('something went wrong please try again')
// console.log(message);
    }
catch(err)
{
    console.log(err);
    return res.status(400).send('something went wrong please try again')
}
}





export const listUserByRole=async (req,res)=>{

    console.log(req.body);

    try{

let users= await User.find({$and:[{role:{$ne:req.body.role}},{role:{$ne:2}}]},{password:0,createdAt:0,updatedAt:0}).exec()

        console.log(users);
        return res.json(users);
       

    }
    catch(err){

    return res.status(400).send('something went wrong please try again')

    }
}


export const insertTextMessage=async(message)=>{


    try{

        const newMessage = new chat({
            type:"text",
            message:message.Message,
            sender: message.senderId,
            receiver: message.receiverId
          
        })
        await newMessage.save();
     
        return newMessage
    }
    catch(err)
    {
        console.log(err);

    }
}

export const insertImageMessage=async (message)=>{
    console.log("inside pic msg",message);

    try{

       const newMessage=new chat({
        type:'image',
        message:message.message,
        sender:message.sender,
        receiver:message.receiver

    })
    await newMessage.save();

    return newMessage
}
catch(error)
{
    console.log(error);
}
}




