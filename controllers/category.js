import Category from '../models/category'

export const addCategory = async(req,res)=>{

    console.log(req.body);
    if(!req.body.categoryName){
        return res.status(400).send("Category Name is required*")
    } 
    if(!req.body.addedBy){
        return res.status(400).send("Something went wrong, Please try again.*")
    }
 
    try{

        let categoryExist = await Category.findOne({categoryName:req.body.categoryName}).exec();

        if(categoryExist){
            return res.status(400).send("Category Name is already exists, try another name.");
        }

        const category = new Category({
            categoryName:req.body.categoryName,
            addedBy: req.body.addedBy
        })
        await category.save();
        return res.json({success: true}) 
    }
    catch(error){
        console.log(error);
        return res.status(400).send("something went wrong plz try again")
    }
}


// to get all Category
export const getCategories = async (req,res)=>{
    try{
        const data = await Category.find({}).populate('addedBy').sort({updatedAt: 'desc'}).exec();
        return res.json(data)
    }
    catch(error){  
        console.log(error);
        return res.status(400).send('Something went wrong. Please try again.')
    }
}

// to get all Active Category
export const getActiveCategories = async (req,res)=>{
    try{
        const data = await Category.find({status:0}).populate('addedBy').sort({updatedAt: 'desc'}).exec();
        return res.json(data)
    }
    catch(error){ 
        console.log(error);
        return res.status(400).send('Something went wrong. Please try again.')
    }
}

export const getCategoryById = async(req,res)=>{
    try{
        let data = await Category.findOne({ _id: req.body.categoryId}).exec()
        return res.json(data)
    }
    catch(error){
        console.log(error);
        return res.status(400).send('Something went wrong, please try again')
    }
}

export const updateCategory = async(req,res) => {
    console.log(req.body);

    if(!req.body.id){
        return res.status(400).send('Access Denied!');
    }

    if(!req.body.categoryName){
        return res.status(400).send("Category Name is required*")
    }
    try{
        let categoryExist = await Category.findOne({categoryName:req.body.categoryName}).exec();

        if(categoryExist){
            return res.status(400).send("Category Name is already exists, try another name.");
        }

        let data = await Category.findOneAndUpdate({_id:req.body.id},
            {
                $set:{
                    categoryName: req.body.categoryName,
                }
            })
            return res.json({success: true}) 
    }
    catch(error){
        res.status(400).send('something went wrong')
    }
}

export const updateStatus = async(req,res) => {
    console.log(req.body);

    if(!req.body.id){
        return res.status(400).send('Access Denied!');
    }
    
    try{
        let data = await Category.findOneAndUpdate({_id:req.body.id},
            {
                $set:req.body
            })
            return res.json({success: true}) 
    }
    catch(error){
        res.status(400).send('something went wrong')
    }
}