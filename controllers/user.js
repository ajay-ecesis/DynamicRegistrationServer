// Use only for User Model
import User from '../models/user'
import {hashPassword, comparePassword} from '../utils/auth'

export const lists = async (req,res) => {
    try {
        const data = await User.find({}).sort({updatedAt: 'desc'}).exec();
        return res.json(data);
    } catch (error) {
        console.log("Err", error);
        return res.status(400).send("Something went wrong, Please try again.");
    }
}

// Find By User ID

export const getUserById = async (req,res) => {
    try {
        console.log("req.body", req.body);
        let userExist = await User.findOne({_id:req.body.userId}).exec();
        console.log("UserData", userExist)
        if(!userExist){
            return res.status(400).send("User not exists!");
        }
        console.log("User Data", userExist);
        return res.json(userExist);
        
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send("Something went wrong, Please try again.");
    }
}

export const updateUser = async (req,res) => {

    console.log('Data User', req.body);

    //for validation purpose
    let nameRegExp = new RegExp("^.{1,50}$");
    let emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");

    if( !req.body.firstName && !req.body.lastName && !req.body.email && !req.body.category && !req.body.city && !req.body.zipCode && !req.body.country){
        return res.status(400).send("All fieldsss are required*")
    } 
    if(!req.body.firstName) {
        return res.status(400).send('First Name is required*');
    } 
    if(!req.body.lastName) {
        return res.status(400).send('Last Name is required*');
    } 
    if(!req.body.email) {
        return res.status(400).send('Email is required*');
    } 
    if(!req.body.category) {
        return res.status(400).send('Product Category is required*');
    } 
    if(!req.body.zipCode) {
        return res.status(400).send('Zip Code is required*');
    } 
    if(!req.body.city) {
        return res.status(400).send('City is required*');
    } 
    if(!req.body.country) {
        return res.status(400).send('Country is required*');
    } 

    if(!emailRegexp.test(req.body.email)){
        return res.status(400).send('Please Enter a valid email')
    }

    if(!nameRegExp.test(req.body.firstName)){
        return res.status(400).send('First Name must be between max 32 characters only')
    }

    if(!nameRegExp.test(req.body.lastName)){
        return res.status(400).send('Last Name must be between max 32 characters only')
    } 

    try {
        const data = await  User.findOneAndUpdate({ _id: req.body.userId }, { $set: req.body }, { new: true })
        return res.json(data)
    } catch (error) {
        return res.status(400).send("Something went wrong, Please try again.");
    }
}

// soft delete
export const updateStatus = async (req, res) => {
    if(!req.body.userId){
        return res.status(400).send('Access Denied!')
    }
    console.log('Data', req.body);
    try {
        const data = await User.findOneAndUpdate({ _id: req.body.userId }, { $set: req.body}, { new: true })
        return res.json({success:true})
    } catch (error) {
        return res.status(400).send("Something went wrong, Please try again.");
    }
}


export const userResetpassword  = async(req,res)=>{

    let pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");

    if(!req.body.current) {
        return res.status(400).send('Please enter your current password');
    } 
    if(!req.body.password) {
        return res.status(400).send('Please enter the new password');
    } 
    if(!req.body.password1) {
        return res.status(400).send('Please enter the new password again');
    } 
    if(req.body.password != req.body.password1){
        return res.status(400).send("Passwords dont match");
    }
    if(!pwdRegExp.test(req.body.password)) {
        return res.status(400).send('Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers');
    } 
    if(!pwdRegExp.test(req.body.password1)) {
        return res.status(400).send('Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers');
    } 

    const user = await User.findById({_id:req.user._id}).exec();
    if(!user){
        return res.status(400).send("User not found")
    }

    const match = await comparePassword(req.body.current, user.password);

    if(!match){
        return res.status(400).send("Wrong Password");
    }

    const hashedPassword = await hashPassword(req.body.password);

    await User.updateOne({_id:req.user._id},{password:hashedPassword},(err,doc)=>{
        if(err){
            return res.status(400).send("Reset password failed")
        }
        res.clearCookie("token");
        res.json({message:"Password changed successfully"});
    })
    

}