import SavedPost from '../models/savedPost'

export const addSavedPost = async(req,res) => {
    console.log("Req body", req.body);
    if( !req.body.postId || !req.body.userId || !req.body.postName || !req.body.postSlug){
        return res.status(400).send("All fields are required*")
    } 
    try {
        let savedExists = await SavedPost.findOne({postId:req.body.postId,userId:req.body.userId}).exec();
        console.log("SavedEdists", savedExists);

        if(savedExists){
            const updateSaved = await SavedPost.findOneAndDelete({_id:savedExists._id});
            return res.json({success:"Post removed successfully"})
        }
        else {
            const savedPost = new SavedPost({
                postId: req.body.postId,
                userId: req.body.userId,
                postName: req.body.postName,
                postSlug: req.body.postSlug
            })
            await savedPost.save();
            return res.json({success:"Post Saved Sucessfully"})
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const userSavedposts = async(req,res)=>{
    try{
        const savedPosts = await SavedPost.find({userId:req.user._id}).exec();
        if(!savedPosts){
            return res.status(400).json({
                error:'No Saved posts'
            })
        }
        return res.json(savedPosts)
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Something went wrong, Please try again.')
    }
}

export const removeSavedPosts = async (req,res) => {
    if( !req.body.id){
        return res.status(400).send("ID is required*")
    } 
    try {
        let savedExists = await SavedPost.findOne({_id:req.body.id}).exec();
        console.log("SavedEdists", savedExists);

        if(savedExists){
            const updateSaved = await SavedPost.findOneAndDelete({_id:req.body.id});
            return res.json({success:"Post removed successfully"})
        }
        else {
            console.log(err)
            return res.status(400).send('Post not found!.')
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send('Something went wrong, Please try again.')
    }
}