import express from 'express';
const router = express.Router();

import {lists, addReplyComment, removeComment} from '../controllers/replyComment'
import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'

router.post('/reply/comments', verifyTokenmiddleware, isAuth, lists);
router.post('/reply/comment', verifyTokenmiddleware, isAuth, addReplyComment);
router.post('/remove/reply/comment', verifyTokenmiddleware, isAuth, isAdmin, removeComment)

module.exports = router;