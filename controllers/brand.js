import Brand from '../models/brand'
import User from '../models/user'
import validator from 'validator'

export const updateBrand = async(req,res) => {

    console.log(req.body);

    let nameRegExp = new RegExp("^.{1,50}$");

    if( !req.body.brandName && !req.body.firstName && !req.body.lastName && !req.body.city && !req.body.country && !req.body.zipCode){
        return res.status(400).send("All Mandatory fields are required*")
    } 
    if(!req.body.brandName)
    {
        return res.status(400).send("Brand name is required*")
    }
    if(!req.body.firstName)
    {
        return res.status(400).send("First name is required*")
    }
    if(!req.body.lastName)
    {
        return res.status(400).send("Last name is required*")
    }
    if(!req.body.city)
    {
        return res.status(400).send("City is required*")
    }
    if(!req.body.country)
    {
        return res.status(400).send("Country is required*")
    }
    if(!req.body.zipCode)
    {
        return res.status(400).send("Zip Code is required*")
    }

    if(!nameRegExp.test(req.body.firstName)){
        return res.status(400).send('First Name must be between max 50 characters only')
    }

    if(!nameRegExp.test(req.body.lastName)){
        return res.status(400).send('Last Name must be between max 50 characters only')
    }

    if(req.body.url){
        if(!validator.isURL(req.body.url)){
            return res.status(400).send("Enter a valid Website url!")
        }
    }

    try{

        if(req.body.category && req.body.market){
            const brandData = await Brand.findOneAndUpdate({_id: req.body.Id},{
                $set:{
                    category: req.body.category,
                    brandName: req.body.brandName,
                    url: req.body.url,
                    market:req.body.market,
                    linkedIn:req.body.linkedIn     
                }
            },{new:true})
        }
        else if(req.body.category && !req.body.market) {
            const brandData = await Brand.findOneAndUpdate({_id: req.body.Id},{
                $set:{
                    category: req.body.category,
                    brandName: req.body.brandName,
                    url: req.body.url,
                    linkedIn:req.body.linkedIn     
                }
            },{new:true})
        }
        else if(!req.body.category && req.body.market) {
            const brandData = await Brand.findOneAndUpdate({_id: req.body.Id},{
                $set:{
                    brandName: req.body.brandName,
                    url: req.body.url,
                    market:req.body.market,
                    linkedIn:req.body.linkedIn     
                }
            },{new:true})
        }
        else {
            const brandData = await Brand.findOneAndUpdate({_id: req.body.Id},{
                $set:{
                    brandName: req.body.brandName,
                    url: req.body.url,
                    linkedIn:req.body.linkedIn     
                }
            },{new:true})
        } 

        const brandData = await Brand.findOneAndUpdate({_id: req.body.Id},{
            $set:{
                category: req.body.category,
                brandName: req.body.brandName,
                url: req.body.url,
                market:req.body.market,
                linkedIn:req.body.linkedIn     
            }
        },{new:true})

        const data = await User.findOneAndUpdate({_id: req.body.userId}, {$set:req.body}, {new: true})

        return res.json({success: true}) 
    }
    catch(error){
        console.log("Error", error);
        return res.status(400).send("something went wrong plz try again")
    }
}

// to get all brands
export const getBrand = async (req,res)=>{
    try{
        const data = await Brand.find({}).populate('userId').populate('category').populate('market').sort({updatedAt: 'desc'}).exec();
        console.log(data);
        return res.json(data)
    }
    catch{
        res.status(400).send('something went wrong. Please try again.')
    }
}

export const getBrandById = async(req,res)=>{
    console.log(req.body);
    try{
        let data = await Brand.findOne({ _id: req.body.brandId}).populate('userId').populate('market').populate('category').exec()
        console.log(data);
        return res.json(data)
    }
    catch{
        return res.status(400).send('Something went wrong, Please try again.')
    }
}

export const getBrandByUserId = async(req,res)=>{
    console.log(req.body);
    try{
        let data = await Brand.findOne({ userId: req.body.userId}).populate('userId').populate('market').populate('category').exec()
        console.log(data);
        return res.json(data)
    }
    catch{
        return res.status(400).send('Something went wrong, Please try again.')
    }
}