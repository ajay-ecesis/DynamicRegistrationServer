import express from 'express';
const router = express.Router();

import {addSavedPost, userSavedposts, removeSavedPosts} from '../controllers/savedPost'
import {verifyTokenmiddleware, isAuth} from '../middlewares/index'

router.post('/save/post', verifyTokenmiddleware, isAuth, addSavedPost);
router.get('/user/saved/posts', verifyTokenmiddleware, isAuth, userSavedposts)
router.delete('/user/remove/saved/post', verifyTokenmiddleware, isAuth, removeSavedPosts)

module.exports = router;