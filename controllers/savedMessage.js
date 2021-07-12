import savedMessages from "../models/savedMessages";


export const saveMessage=async(req,res)=>{


try{

    let savedExists = await savedMessages.findOne({messageId:req.body.messageId,savedBy:req.body.userId}).exec();

if(savedExists)
{
    return res.json({success:'message is already saved'})
}

else
{

    const newSavedMessage=new savedMessages({

        messageId:req.body.messageId,
        savedBy:req.body.userId

    })
    await newSavedMessage.save()
    return res.json({success:"Message Saved Sucessfully"})
}
}
catch{

    return res.status(400).send("something went wrong")
}
}