import Likes from "../models/like"


export const likepost = async (req,res)=>{
    console.log(req.body)
    const userId = req.user._id;
    const post = req.body.postId;
    const filter = { postId: post,userId:userId };
    const update = {postId: post,userId:userId ,status:true}

    try{
       const result = await Likes.findOneAndUpdate(filter,update,{new:true,upsert:true});
       if(!result){
           return res.status(400).json({
               error:'something went wrong'
           })
       }
        res.json({success:"you liked the post"})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error:'something went wrong'
        })
    }
}


export const userlikedposts = async(req,res)=>{
    try{
        const likedposts = await Likes.find({userId:req.user._id}).exec();
        if(!likedposts){
            return res.status(400).json({
                error:'No liked posts'
            })
        }
        res.json(likedposts)
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            err:'Something went wrong'
        })
    }
}


export const unlikepost  =  async(req,res)=>{
    try{
        const filter = { postId: req.body.postId,userId:req.user._id };
        const update = { status: false };
        const result = await Likes.findOneAndUpdate(filter,update);
        if(!result){
            return res.status(400).json({
                error:'failed operation'
            })
        }
        res.json({success:"you disliked the post"})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error:'something went wrong'
        })
    }
}


export const likefromlist = async(req,res)=>{
    try{

        const post  = await Likes.findOne({ postId: req.body.postId,userId:req.user._id });

        if(!post){
            const newdata = new Likes({
                postId:req.body.postId,
                userId:req.user._id,
                status:true
            })
            const response = await newdata.save();
            if(!response){
                return res.status(400).json({
                    error:"something went wrong"
                })
            }
            return res.json({success:"you liked the post"})
        }
        if(post.status){
            const filter = { postId: req.body.postId,userId:req.user._id };
            const update = { status: false };
            const result = await Likes.findOneAndUpdate(filter,update);
            if(!result){
               return res.status(400).json({
                    error:'failed operation'
                })
            }
            return res.json({success:"you disliked the post"})
        }

        if(!post.status){
            const userId = req.user._id;
            const post = req.body.postId;
            const filter = { postId: post,userId:userId };
            const update = {postId: post,userId:userId ,status:true}
        
               const result = await Likes.findOneAndUpdate(filter,update,{new:true,upsert:true});
               if(!result){
                   return res.status(400).json({
                       error:'something went wrong'
                   })
               }
              return  res.json({success:"you liked the post"})
        }

        console.log(post)
        res.json(post)
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error:'something went wrong'
        })
    }
}