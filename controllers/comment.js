import Comment from '../models/comment';
import ReplyComment from '../models/replyComment';

//let textRegExp = new RegExp("^.{1,500}$"); // For comments length validation

export const lists = async (req, res) => {
    try {
        const data = await Comment.find({postId:req.body.postId}).sort({_updatedAt:'asc'}).populate('userId').exec();
        return res.json(data);
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const addComment = async (req, res) => {

    console.log("Req body", req.body);

    if( !req.body.postId || !req.body.userId || !req.body.message || !req.body.postName){
        return res.status(400).send("All fields are required*")
    } 

    /* if(!textRegExp.test(req.body.message)){
        return res.status(400).send('Comment must be between max 500 characters only')
    } */

    try {
        const comment = new Comment({
            postId: req.body.postId,
            userId: req.body.userId,
            message: req.body.message,
            postName: req.body.postName
        })
        await comment.save();
        return res.json({success:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const listsAllComments = async (req, res) => {
    try {
        const data = await Comment.find({}).sort({_updatedAt:'asc'}).populate('userId').exec();
        return res.json(data);
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const getCommentById = async (req,res) => {
    try {
        console.log("req.body", req.body);
        let commentExist = await Comment.findOne({_id:req.body.id}).populate('userId').exec();
        if(!commentExist){
            return res.status(400).send("Comment not exists!");
        }
        return res.json(commentExist);
        
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send("Something went wrong, Please try again.");
    }
}

export const removeComment = async (req,res) => {
    if(!req.body.id){
        return res.status(400).send("Acess Denied!")
    } 
    
    try {
        const replyData = await ReplyComment.findOneAndDelete({commentId:req.body.id});
        const data = await Comment.findOneAndDelete({_id:req.body.id});
        return res.json({success:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}