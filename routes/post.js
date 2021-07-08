import express from 'express';
const router = express.Router();
import {likepost,userlikedposts,unlikepost,likefromlist} from '../controllers/post'
import {verifyTokenmiddleware, isAuth} from '../middlewares/index'

router.post('/likepost', verifyTokenmiddleware, isAuth, likepost);
router.get('/userlikedposts', verifyTokenmiddleware, isAuth, userlikedposts)
router.post('/unlike', verifyTokenmiddleware, isAuth, unlikepost)
router.post('/likefromlist', verifyTokenmiddleware, isAuth, likefromlist)


module.exports = router;