import ReplyComment from '../models/replyComment';

//let textRegExp = new RegExp("^.{1,500}$"); // For Reply comments length validation

export const lists = async (req, res) => {
    try {
        const data = await ReplyComment.find({commentId:req.body.commentId}).sort({_updatedAt:'asc'}).populate('userId').exec();
        return res.json(data);
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const addReplyComment = async (req, res) => {

    console.log("Req body", req.body);

    if( !req.body.postId || !req.body.userId || !req.body.message || !req.body.commentId || !req.body.postName){
        return res.status(400).send("All fields are required*")
    } 

    /* if(!textRegExp.test(req.body.message)){
        return res.status(400).send('Comment must be between max 500 characters only')
    } */

    try {
        const replyComment = new ReplyComment({
            postId: req.body.postId,
            userId: req.body.userId,
            commentId: req.body.commentId,
            message: req.body.message,
            postName: req.body.postName
        })
        await replyComment.save();
        return res.json({success:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

export const removeComment = async (req,res) => {

    console.log("Req body", req.body);

    if(!req.body.id){
        return res.status(400).send("Acess Denied!")
    } 

    try {
        const data = await ReplyComment.findOneAndDelete({_id:req.body.id});
        return res.json({success:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(400).send('Someting went wrong, Please try again.')
    }
}

