import registrationField from "../models/registrationField";


export const addNewRegistrationField=async (req,res)=>{

    console.log(req.body);

    if(!req.type&&!req.body.NewField&&!req.body.validation&&!req.body.type&&!req.body.addedBy)
   
   {
    return res.status(400).send('Someting went wrong, Please try again.')
   }
   

    try{

        const regField = new registrationField({                         
            fieldName: req.body.NewField,
            fieldType: req.body.type,
            validation: req.body.validation,
            fieldFor:req.body.fieldFor,
            addedBy: req.body.addedBy,
          
          });

          await regField.save();


          return res.json({success: true}) 

    }
    catch(error){
console.log('errrrrr',error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}


export const getRegistrationFields=async(req,res)=>{

    try{
        const data = await registrationField.find({}).populate('addedBy').sort({updatedAt: 'desc'}).exec();

        console.log("this data",data);
        return res.json(data)
        
    }
    catch(error)
    {
     return  res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const getRegistrationFieldByBrand=async(req,res)=>{

    try{
        const data = await registrationField.find({fieldFor:'Brand'}).populate('addedBy').sort({updatedAt: 'desc'}).exec();

        console.log("this data",data);
        return res.json(data)

    }
    catch(error){

        return  res.status(400).send('Someting went wrong, Please try again.')
    }
}


export const getRegistrationFieldByManufacturer=async(req,res)=>{

    try{
        const data = await registrationField.find({fieldFor:'Manufacturer'}).populate('addedBy').sort({updatedAt: 'desc'}).exec();

        console.log("this data",data);
        return res.json(data)

    }
    catch(error){

        return  res.status(400).send('Someting went wrong, Please try again.')
    }
}
