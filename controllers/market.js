import Market from '../models/market'

export const addMarket = async(req,res)=>{

    console.log(req.body);
    if(!req.body.marketName){
        return res.status(400).send("Market Name is required*")
    } 
    if(!req.body.addedBy){
        return res.status(400).send("Something went wrong, Please try again.*")
    }
 
    try{
        let marketExist = await Market.findOne({marketName:req.body.marketName}).exec();

        if(marketExist){
            return res.status(400).send("Market Name is already exists, try another name.");
        }

        const market = new Market({
            marketName:req.body.marketName,
            addedBy: req.body.addedBy
        })
        await market.save();
        return res.json({success: true}) 
    }
    catch(error){
        console.log(error);
        return res.status(400).send("something went wrong plz try again")
    }
}


// to get all Markets
export const getMarkets = async (req,res)=>{
    try{
        const data = await Market.find({}).populate('addedBy').sort({updatedAt: 'desc'}).exec();
        return res.json(data)
    }
    catch(error){  
        console.log(error);
        return res.status(400).send('Something went wrong. Please try again.')
    }
}

// to get all Active Market
export const getActiveMarkets = async (req,res)=>{
    try{
        const data = await Market.find({status:0}).populate('addedBy').sort({updatedAt: 'desc'}).exec();
        return res.json(data)
    }
    catch(error){
        console.log(error);
        return res.status(400).send('Something went wrong. Please try again.')
    }
}

export const getMarketById = async(req,res)=>{
    try{
        let data = await Market.findOne({ _id: req.body.marketId}).exec()
        return res.json(data)
    }
    catch(error){
        console.log(error);
        return res.status(400).send('something went wrong please try again')
    }
}

export const updateMarket = async(req,res) => {
    console.log(req.body);

    if(!req.body.id){
        return res.status(400).send('Access Denied!');
    }

    if(!req.body.marketName){
        return res.status(400).send("Market Name is required*")
    }
    try{
        let marketExist = await Market.findOne({marketName:req.body.marketName}).exec();

        if(marketExist){
            return res.status(400).send("Market Name is already exists, try another name.");
        }

        let data = await Market.findOneAndUpdate({_id:req.body.id},
            {
                $set:{
                    marketName: req.body.marketName,
                }
            })
            return res.json({success: true}) 
    }
    catch(error){
        res.status(400).send('Something went wrong, Please try again.')
    }
}

export const updateStatus = async(req,res) => {
    console.log(req.body);

    if(!req.body.id){
        return res.status(400).send('Access Denied!');
    }
    try{
        let data = await Market.findOneAndUpdate({_id:req.body.id},
            {
                $set:req.body
            })
            return res.json({success: true}) 
    }
    catch(error){
        res.status(400).send('something went wrong')
    }
}