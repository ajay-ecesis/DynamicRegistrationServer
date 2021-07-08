import express from 'express';
const router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

import {brandRegister, login, manufacturerRegister, logout} from '../controllers/auth'
import {checkToken} from '../middlewares'

router.post('/brand', brandRegister);
router.post('/manufacturer', manufacturerRegister);

// router.post('/manufacturer', (req,res)=>{

//     console.log(req.body.email);

//     console.log("FILE",req.files);
// }

// );


router.post('/login', login);
router.get('/logout', logout);
router.get('/auth', checkToken); // For checking Authenticated or not

module.exports = router;