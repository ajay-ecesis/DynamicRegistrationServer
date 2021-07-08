const express = require('express');
const router = express.Router();

import {lists, getUserById, updateUser, updateStatus, userResetpassword} from '../controllers/user';
import {verifyTokenmiddleware, isAuth} from '../middlewares'

router.get('/users/list', lists);
router.post('/user/id', getUserById);
router.put('/update/user', updateUser)
router.put('/update/user/status', updateStatus);
router.put('/user/resetpassword', verifyTokenmiddleware, isAuth, userResetpassword)

module.exports = router;