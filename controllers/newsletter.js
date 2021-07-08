import Newsletter from "../models/newsletter";
import validator from 'validator'

export const addNewsletter = async (req,res) => {
    console.log("Req bdy", req.body);
    if(!req.body.email){
        return res.status(400).send('Email field is required*');
    }
    let emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!emailRegexp.test(req.body.email)){
        return res.status(400).send('Please Enter a valid email')
    }
    
    const {email} = req.body;

    try {
        const newsletter = new Newsletter({email})
        await newsletter.save();
        return res.json({success: true})
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Something went wrong, Please try again.');
    }
}

export const list = async (req,res) => {
    try {
        const data = await Newsletter.find({}).sort({createdAt: 'desc'}).exec();
        return res.json(data);
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Something went wrong, Please try again.');
    }
}

export const remove = async (req,res) => {
    if(!req.body.id){
        return res.status(400).send("Acess Denied!")
    } 
    try {
        const data = await Newsletter.findOneAndDelete({_id: req.body.id});
        return res.json({success:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Something went wrong, Please try again.');
    }
}