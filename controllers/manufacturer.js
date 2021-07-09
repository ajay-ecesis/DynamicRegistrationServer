import Manufacturer from '../models/manufacturer'
import User from '../models/user'
const fs=require('fs')

export const updateManufacturer = async(req,res) => {

    let nameRegExp = new RegExp("^.{1,50}$");

    let yearRegExp = new RegExp("^.{4,4}$");

    if(!req.body.year && !req.body.firstName && !req.body.lastName && !req.body.city && !req.body.country && !req.body.zipCode && !req.body.addressLine1 && !req.body.employees && !req.body.factoryInfo && !req.body.heading && !req.body.samplingTime && !req.body.sku && !req.body.supplierName ){
        return res.status(400).send("All Mandatory fields are required*")
    } 

    if(!req.body.supplierName) {
        return res.status(400).send('Supplier Name is required*');
    } 

    if(!req.body.year) {
        return res.status(400).send('Year is required*');
    } 
    if(!yearRegExp.test(req.body.year)){
        return res.status(400).send('Year should be in four characters only!')
    }
    
    if(!req.body.addressLine1) {
        return res.status(400).send('address 1 is required*');
    } 
    if(!req.body.employees) {
        return res.status(400).send('employees are required*');
    } 
    if(!req.body.factoryInfo) {
        return res.status(400).send('factory infoo is required*');
    } 
    if(!req.body.sku)
    {
        return res.status(400).send('sku is needed')
    }
    if(!req.body.heading) {
        return res.status(400).send('Profile heading is required*');
    } 
    if(!req.body.multiphotos) {
        return res.status(400).send('multiphotos is required*');
    } 
    if(!req.body.certifications) {
        return res.status(400).send('certification is required*');
    } 
    if(!req.body.samplingTime) {
        return res.status(400).send('Sampling Time is required*');
    } 
    if(!req.body.firstName) {
        return res.status(400).send('First Name is required*');
    } 
    if(!req.body.lastName) {
        return res.status(400).send('Last Name is required*');
    } 
    if(!req.body.city) {
        return res.status(400).send('City is required*');
    } 
    if(!req.body.country) {
        return res.status(400).send('Country is required*');
    } 
    if(!req.body.zipCode) {
        return res.status(400).send('Zip Code is required*');
    } 

    if(!nameRegExp.test(req.body.firstName)){
        return res.status(400).send('First Name must be between max 50 characters only')
    }

    if(!nameRegExp.test(req.body.lastName)){
        return res.status(400).send('Last Name must be between max 50 characters only')
    }

    try{

        // Parsing Images
        let tempMultiPhotos = JSON.parse(req.body.multiphotos);
        let tempCertifications = JSON.parse(req.body.certifications);

        const data = await Manufacturer.findOneAndUpdate({_id:req.body.Id},
            {$set:{
                supplierName: req.body.supplierName,
                category: req.body.category,
                year: req.body.year,
                employees: req.body.employees,
                category: req.body.category,
                sku: req.body.sku,
               /*  speciality: req.body.speciality, */
                samplingTime: req.body.samplingTime,
                /* dailyCapacity: req.body.dailyCapacity, */
                monthlyCapacity: req.body.monthlyCapacity,
                terms: req.body.terms,
                importantClients: req.body.importantClients,
                heading: req.body.heading,
                factoryInfo: req.body.factoryInfo,
               /*  skills: req.body.skills, */
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                certifications: tempCertifications,
                multiphotos: tempMultiPhotos,
            }},
             {new: true}
        )

        const usertdata = await User.findOneAndUpdate({_id: req.body.userId}, {$set:req.body}, {new: true})

        return res.json({success: true}) 
        /* if(data.nModified == 1 && data.ok == 1) {
            return res.json({success: true}) 
        }
        return res.send("not updated");  */
    }
    catch(error){
        console.log("Error", error)
        return res.status(400).send("Something went wrong, Please try again")
    }
}

export const getAllManufacturers = async (req,res)=>{
    try{
        let data = await Manufacturer.find({},{multiphotos:0,certifications:0}).populate('userId').sort({updatedAt: 'desc'}).exec(); 
        return  res.json(data)
    }
    catch{
        return res.status(400).send("something went wrong plz try again")
    }
}

export const getManufacturerById = async(req,res)=>{
    try{
        let data = await Manufacturer.findOne({ _id: req.body.Id}).populate('userId').exec()
        return res.json(data)
    }
    catch{
        return res.status(400).send('something went wrong please try again')
    }
}

export const getManufacturerByUserId = async(req,res)=>{
    try{
        let data = await Manufacturer.findOne({ userId: req.body.userId}).populate('userId').exec()
        return res.json(data)
    }
    catch{
        return res.status(400).send('something went wrong please try again')
    }
}


// uploads an image file and response is given back

export const uploadCertificates= async (req,res)=>{

    var uniqueFileName=Date.now()  //making a unique file name for naming

    var PATH="./images/certificates/"

    var multipleCertificates=[] //array to store multiple paths and send back to user as array

    try{
        console.log(req.files);

        if(Array.isArray( req.files.certifications))
        {
            
            for(let i=0;i<req.files.certifications.length;i++)
            {

                uniqueFileName=Date.now() 
                let image =await req.files.certifications[i];             

                await image.mv(PATH + uniqueFileName + ".jpg")

                multipleCertificates.push(await "/images/certificates/" + uniqueFileName + ".jpg")
                console.log("htis is multipel",multipleCertificates);
                
                };
                
                console.log("final array",multipleCertificates);
                res.json(multipleCertificates)

               
            }
           
       

        else  // In case of single uploads
        {
            let image = req.files.certifications;
  
  await image.mv(PATH + uniqueFileName + ".jpg", async (err, done) => {
    if (err) {
      console.log("err",err);
    } else {

        await    multipleCertificates.push("/images/certificates/"+uniqueFileName+'.jpg')
        console.log("pushed",multipleCertificates);

        console.log("final array",multipleCertificates);
        res.json(multipleCertificates)
    }
  });

}

    }
    catch{

        res.status(400).send('something went wrong')
    }
}

export const uploadMultiplePhotos= async(req,res)=>{

    var uniqueFileName=Date.now()  //making a unique file name for naming

    var PATH="./images/multiphotos/"

    var multiplePhotosArray=[] //array to store multiple paths and send back to user as array

    try{
        console.log(req.files);

        if(Array.isArray( req.files.multiphotos))
        {
            
            for(let i=0;i<req.files.multiphotos.length;i++)
            {

                uniqueFileName=Date.now() 
                let image =await req.files.multiphotos[i];             

                await image.mv(PATH + uniqueFileName + ".jpg")

                multiplePhotosArray.push(await "/images/multiphotos/" + uniqueFileName + ".jpg")
                
                
                };
                
                console.log("final array",multiplePhotosArray);
                res.json(multiplePhotosArray)

               
            }
           
       

        else  // In case of single uploads
        {
            let image = req.files.multiphotos;
  
  await image.mv(PATH + uniqueFileName + ".jpg", async (err, done) => {
    if (err) {
      console.log("err",err);
    } else {

        await    multiplePhotosArray.push("/images/multiphotos/"+uniqueFileName+'.jpg')
        console.log("pushed",multiplePhotosArray);

        console.log("final array",multiplePhotosArray);
        res.json(multiplePhotosArray)
    }
  });

}

    }
    catch{

        res.status(400).send('something went wrong')
    }

}

export const removeImage=async(req,res)=>{

    console.log("api to delete");
    try{
        console.log("delete",req.body);

// deletes a file
        fs.unlink("."+req.body.item, function() {
          console.log("done");
            res.send ("success");     
          });
    }
    catch
    {

    }

}