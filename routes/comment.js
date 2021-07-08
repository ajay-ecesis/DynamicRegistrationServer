import express from 'express';
const router = express.Router();

import {lists, addComment, listsAllComments, getCommentById, removeComment} from '../controllers/comment'
import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'

router.post('/comments', verifyTokenmiddleware, isAuth, lists);
router.post('/comment', verifyTokenmiddleware, isAuth, addComment);
router.get('/comments', verifyTokenmiddleware, isAuth, isAdmin, listsAllComments);
router.post('/user/comment', verifyTokenmiddleware, isAuth, isAdmin, getCommentById);
router.post('/remove/comment', verifyTokenmiddleware, isAuth, isAdmin, removeComment)

module.exports = router;