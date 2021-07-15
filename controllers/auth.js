import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import Brand from "../models/brand";
import Manufacturer from "../models/manufacturer";
import capitalizeFirstLetter from "../helpers/capitalize";
import validator from "validator";
import customFieldValues from "../models/customFieldValues";


export const brandRegister = async (req, res) => {
  console.log("Data", req.body);



  let nameRegExp = new RegExp("^.{1,50}$");
  let emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let pwdRegExp = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
  );

  if (
    !req.body.firstName &&
    !req.body.lastName &&
    !req.body.email &&
    !req.body.password &&
    !req.body.password1 &&
    !req.body.brandName &&
    !req.body.city &&
    !req.body.zipCode &&
    !req.body.country
  ) {
    return res.status(400).send("All Mandatory fields are required*");
  }

  if (req.body.url) {
    if (!validator.isURL(req.body.url)) {
      return res.status(400).send("Enter a valid Website url!");
    }
  }

  if (!req.body.brandName) {
    return res.status(400).send("Brand Name is required*");
  }

  if (!req.body.firstName) {
    return res.status(400).send("First Name is required*");
  }
  if (!req.body.lastName) {
    return res.status(400).send("Last Name is required*");
  }
  if (!req.body.email) {
    return res.status(400).send("Email is required*");
  }
  if (!req.body.password) {
    return res.status(400).send("Password is required*");
  }
  if (!req.body.password1) {
    return res.status(400).send("Confirm Password is required*");
  }

  if (!req.body.zipCode) {
    return res.status(400).send("Zip Code is required*");
  }
  if (!req.body.city) {
    return res.status(400).send("City is required*");
  }
  if (!req.body.country) {
    return res.status(400).send("Country is required*");
  }

  if (!pwdRegExp.test(req.body.password)) {
    return res
      .status(400)
      .send(
        "Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers"
      );
  }

  if (!emailRegexp.test(req.body.email)) {
    return res.status(400).send("Please Enter a valid email");
  }

  if (!nameRegExp.test(req.body.firstName)) {
    return res
      .status(400)
      .send("First Name must be between max 50 characters only");
  }

  if (!nameRegExp.test(req.body.lastName)) {
    return res
      .status(400)
      .send("Last Name must be between max 50 characters only");
  }

  if (req.body.password !== req.body.password1) {
    return res.status(400).send("Password and Confirm Password not match.");
  }

  try {
    let userExist = await User.findOne({ email: req.body.email }).exec();

    if (userExist) {
      return res.status(400).send("Email is already taken, try another email.");
    }

    // hash password
    const hashedPassword = await hashPassword(req.body.password);

    //register
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country,
    });
    await user.save();

    if (user) {
      /* const brand = new Brand({
                brandName: req.body.brandName,
                category: req.body.category,
                url: req.body.url,
                market: req.body.market,
                linkedIn: req.body.linkedIn,
                zipCode: req.body.zipCode,
                city: req.body.city,
                country: req.body.country,
                userId: user._id
            }) */
      if (req.body.category && req.body.market) {
        const brand = new Brand({
          brandName: req.body.brandName,
          category: req.body.category,
          url: req.body.url,
          market: req.body.market,
          linkedIn: req.body.linkedIn,
          zipCode: req.body.zipCode,
          city: req.body.city,
          country: req.body.country,
          userId: user._id,
        });
        await brand.save();
      } else if (req.body.category && !req.body.market) {
        const brand = new Brand({
          brandName: req.body.brandName,
          category: req.body.category,
          url: req.body.url,
          linkedIn: req.body.linkedIn,
          zipCode: req.body.zipCode,
          city: req.body.city,
          country: req.body.country,
          userId: user._id,
        });
        await brand.save();
      } else if (!req.body.category && req.body.market) {
        const brand = new Brand({
          brandName: req.body.brandName,
          market: req.body.market,
          url: req.body.url,
          linkedIn: req.body.linkedIn,
          zipCode: req.body.zipCode,
          city: req.body.city,
          country: req.body.country,
          userId: user._id,
        });
        await brand.save();
      } else {
        const brand = new Brand({
          brandName: req.body.brandName,
          url: req.body.url,
          linkedIn: req.body.linkedIn,
          zipCode: req.body.zipCode,
          city: req.body.city,
          country: req.body.country,
          userId: user._id,
        });
        await brand.save();

      }

//saves to db if customfield is present
if(req.body.customFields)   
{
  let customFields=req.body.customFields


   for (const [key, value] of Object.entries(customFields)) {
    console.log(`ket`,key);

    let data= new customFieldValues({

      userId:user._id,
      fieldName:key,
      value:value
      
    })

   await data.save()

  }
    
}






      return res.json({ success: true });
    }
  } catch (error) {
    console.log("Err", error);
    return res.status(400).send("Error, Please try again.");
  }
};






// manufacturer register

export const manufacturerRegister = async(req,res) => {

  let nameRegExp = new RegExp("^.{1,50}$");
  let yearRegExp = new RegExp("^.{4,4}$");
  let emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");

  if( !req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password && !req.body.password1 && !req.body.supplierName && !req.body.year && !req.body.employees && !req.body.sku && !req.body.samplingTime  && !req.body.monthlyCapacity && !req.body.heading && !req.body.factoryInfo && !req.body.addressLine1 && !req.body.city && !req.body.zipCode && !req.body.country && req.body.certifications.length ==0 && req.body.multiphotos.length==0){
      return res.status(400).json({allEmpty:true ,message:"All Mandatory fields are required*"})
  } 
  
  if(!req.body.supplierName) {
      return res.status(400).json({supplierName:true, message:'Supplier Name is required*'});
  } 
  if(!req.body.year) {
      return res.status(400).json({year:true, message:'Year is required*'});
  } 
  if(!yearRegExp.test(req.body.year)){
      return res.status(400).json({year:true, message:'Year should be in four characters only!'})
  }
  if(!req.body.employees) {
      return res.status(400).json({employees:true, message:'Number of employees is required*'});
  } 
  if(!req.body.sku) {
      return res.status(400).json({sku:true, message:'Minimum order per SKU is required*'});
  } 
  if(!req.body.samplingTime) {
      return res.status(400).json({samplingTime:true, message:'Sampling time in weeks is required*'});
  } 
  if(!req.body.monthlyCapacity) {
      return res.status(400).json({monthlyCapacity:true, message:'Maximum monthly capacity is required*'});
  } 
  if(!req.body.heading) {
      return res.status(400).json({heading:true, message:'Profile heading is required*'});
  } 
  if(!req.body.factoryInfo) {
      return res.status(400).json({factoryInfo:true, message:'Please share as much information is required*'});
  } 
  if(!req.body.addressLine1) {
      return res.status(400).json({addressLine1:true, message:'First line of address is required*'});
  } 
  if(!req.body.zipCode) {
      return res.status(400).json({zipCode:true, message:'Zip Code is required*'});
  } 
  if(!req.body.city) {
      return res.status(400).json({city:true, message:'City is required*'});
  } 
  if(!req.body.country) {
      return res.status(400).json({country:true, message:'Country is required*'});
  } 
  if(!req.body.certifications.length) {
      return res.status(400).json({certifications:true, message:'Certifications is required*'});
  } 
  if(!req.body.multiphotos.length) {
      return res.status(400).json({multiphotos:true, message:'Multiphotos is required*'});
  } 
  if(!req.body.firstName) {
      return res.status(400).json({firstName:true, message:'First Name is required*'});
  } 
  if(!nameRegExp.test(req.body.firstName)){
      return res.status(400).json({firstName:true, message:'First Name must be between max 50 characters only'})
  }

  if(!req.body.lastName) {
      return res.status(400).json({lastName:true, message:'Last Name is required*'});
  } 
  if(!nameRegExp.test(req.body.lastName)){
      return res.status(400).json({lastName:true, message:'Last Name must be between max 50 characters only'})
  }
  
  if(!req.body.email) {
      return res.status(400).json({email:true, message:'Email is required*'});
  } 
  if(!emailRegexp.test(req.body.email)){
      return res.status(400).json({email:true, message:'Please Enter a valid email'})
  }

  if(!req.body.password) {
      return res.status(400).json({password:true, message:'Password is required*'});
  } 
  if(!pwdRegExp.test(req.body.password)) {
      return res.status(400).json({password:true, message:'Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers'});
  } 

  if(!req.body.password1) {
      return res.status(400).json({password1:true, message:'Confirm Password is required*'});
  } 
  if(req.body.password !== req.body.password1){
      return res.status(400).json({password:true, message:'Password and Confirm Password not match.'})
  }

  try {

      let userExist = await User.findOne({email:req.body.email}).exec();

      if(userExist){
          return res.status(400).json({email:true, message:"Email is already taken, try another email."});
      }

      // hash password
      const hashedPassword = await hashPassword(req.body.password);

      // Parsing Images
      let tempMultiPhotos = JSON.parse(req.body.multiphotos);
      let tempCertifications = JSON.parse(req.body.certifications);

      //register
      const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role,
      })
      await user.save();

      if(user){
          const manufacturer = new Manufacturer({
              supplierName: req.body.supplierName,
              category: req.body.category,
              year: req.body.year,
              employees: req.body.employees,
              category: req.body.category,
              sku: req.body.sku,
              /* speciality: req.body.speciality, */
              samplingTime: req.body.samplingTime,
             /*  dailyCapacity: req.body.dailyCapacity, */
              monthlyCapacity: req.body.monthlyCapacity,
              terms: req.body.terms,
              importantClients: req.body.importantClients,
              heading: req.body.heading,
              factoryInfo: req.body.factoryInfo,
              /* skills: req.body.skills, */
              addressLine1: req.body.addressLine1,
              addressLine2: req.body.addressLine2,
              certifications: tempCertifications,
              multiphotos: tempMultiPhotos,
              userId: user._id,
              zipCode: req.body.zipCode,
              city: req.body.city,
              country: req.body.country,
          })
          await manufacturer.save();


          
// custom fields enter to db

if(req.body.customFields)   
      {
        let customFields=req.body.customFields
      
      
         for (const [key, value] of Object.entries(customFields)) {
          console.log(`ket`,key);
      
          let data= new customFieldValues({
      
            userId:user._id,
            fieldName:key,
            value:value
            
          })
      
         await data.save()
      
        }
          
      }
      
















          const message = new Message({
              type:0,
              actionby:user._id
          })
  
          await message.save();
          //email verification start
          try{
              const url = process.env.ACTIVATION_MAIL_SEND;
              const data = {
                  "email": `${req.body.email}`,
                  "data": {
                      "first_name": `${req.body.firstName}`
                  }
                }
              const mailstatus = await schedulemail(url,data);
              console.log("mail status",mailstatus)
              if(!mailstatus.success){
                  return res.status(400).json({message:'Failed to send the activation link please contact us to activate your account'}) 
              }
              console.log("mail sendng finished")
          }
          catch(error){
              console.log("mail sed failed",error)
              return res.status(400).json({message:'Failed to send the activation link please contact us to activate your account'}) 
          }
          //email verification end

          return res.json({success: true}) 
      }
      
  } catch (error) {
      console.log("Err", error);
      return res.status(400).json({message:'Something went wrong, Please try again.'})
  }
}






















export const login = async (req, res) => {
  try {
    console.log("Data", req.body);

    if (!req.body.email || !req.body.password) {
      return res.status(400).send("All fields are required*");
    }

    const { email, password } = req.body;

    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).send("No User Found");
    }

    if (user.status === 1) {
      return res
        .status(400)
        .send("Sorry your account has been deactivated. Please contact Indigo");
    }

    // Check Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send("Wrong Password");
    }

    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      //secure: true, // only works on https
    });
    console.log("token", token);
    // send user as json response
    res.json(user);
  } catch (error) {
    console.log("Err", err);
    return res.status(400).send("Something went wrong, Please try again.");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout success" });
  } catch (err) {
    console.log("Err", err);
  }
};
