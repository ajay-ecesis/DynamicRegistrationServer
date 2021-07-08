import express from 'express'
const router = express.Router();

import {addCategory, updateCategory, getCategories, getActiveCategories, getCategoryById, updateStatus} from '../controllers/category'
import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'

router.post('/category', verifyTokenmiddleware, isAuth, isAdmin, addCategory);
router.get('/category', verifyTokenmiddleware, isAuth, isAdmin, getCategories);
router.get('/active/category', getActiveCategories);
router.put('/category', verifyTokenmiddleware, isAuth, isAdmin, updateCategory);
router.post('/get/category', verifyTokenmiddleware, isAuth, isAdmin, getCategoryById);
router.put('/category/status', verifyTokenmiddleware, isAuth, isAdmin, updateStatus);

module.exports = router;