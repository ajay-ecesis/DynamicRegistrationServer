import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import Brand from "../models/brand";
import Manufacturer from "../models/manufacturer";
import capitalizeFirstLetter from "../helpers/capitalize";
import validator from "validator";


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
      return res.json({ success: true });
    }
  } catch (error) {
    console.log("Err", error);
    return res.status(400).send("Error, Please try again.");
  }
};

export const manufacturerRegister = async (req, res) => {
  /*  console.log("Req", req.body); */
  console.log("Req", req.body);

  var multiphotos = req.body.multiphotos;
  var certifications = req.body.certifications;

  // creating base64Data of certifications

  let nameRegExp = new RegExp("^.{1,50}$");
  let yearRegExp = new RegExp("^.{4,4}$");
  let emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let pwdRegExp = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
  );

  if (
    !req.body.year &&
    !req.body.firstName &&
    !req.body.lastName &&
    !req.body.email &&
    !req.body.password &&
    !req.body.password1 &&
    !req.body.supplierName &&
    !req.body.employees &&
    !req.body.sku &&
    !req.body.samplingTime &&
    !req.body.monthlyCapacity &&
    !req.body.heading &&
    !req.body.factoryInfo &&
    !req.body.addressLine1 &&
    !req.body.city &&
    !req.body.zipCode &&
    !req.body.country
  ) {
    return res.status(400).send("All Mandatory fields are required*");
  }

  if (!req.body.supplierName) {
    return res.status(400).send("Supplier Name is required*");
  }
  if (!req.body.year) {
    return res.status(400).send("Year is required*");
  }
  if (!yearRegExp.test(req.body.year)) {
    return res.status(400).send("Year should be in four characters only!");
  }
  if (!req.body.employees) {
    return res.status(400).send("Number of employees is required*");
  }
  if (!req.body.sku) {
    return res.status(400).send("Minimum order per SKU is required*");
  }
  if (!req.body.samplingTime) {
    return res.status(400).send("Sampling time in weeks is required*");
  }
  if (!req.body.monthlyCapacity) {
    return res.status(400).send("Maximum monthly capacity is required*");
  }
  if (!req.body.heading) {
    return res.status(400).send("Profile heading is required*");
  }
  if (!req.body.factoryInfo) {
    return res
      .status(400)
      .send("Please share as much information is required*");
  }
  if (!req.body.addressLine1) {
    return res.status(400).send("First line of address is required*");
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
  if (!req.body.certifications) {
    return res.status(400).send("Certifications is required*");
  }
  if (!req.body.multiphotos) {
    return res.status(400).send("Multiphotos is required*");
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

    // Parsing Images

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
        certifications: certifications,
        multiphotos: multiphotos,
        userId: user._id,
      });
      await manufacturer.save();

      return res.json({ success: true });
    }
  } catch (error) {
    console.log("Err", error);
    return res.status(400).send("Error, Please try again.");
  }
};

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
