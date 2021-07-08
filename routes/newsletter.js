import express from 'express'
const router = express.Router();

import {addNewsletter, list, remove} from '../controllers/newsletter'
import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'

router.post('/newsletter', addNewsletter);
router.get('/newsletter', verifyTokenmiddleware, isAuth, isAdmin, list);
router.post('/remove/newsletter', verifyTokenmiddleware, isAuth, isAdmin, remove);

module.exports = router;