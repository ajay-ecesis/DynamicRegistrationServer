import express from 'express';
const router = express.Router();

import { updateBrand, getBrand, getBrandById, getBrandByUserId } from '../controllers/brand';

import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'

router.get('/getBrands', verifyTokenmiddleware, isAuth, isAdmin, getBrand)
router.put('/updateBrand', verifyTokenmiddleware, isAuth, updateBrand)
router.post('/getBrandById', verifyTokenmiddleware, isAuth, isAdmin, getBrandById)
router.post('/brands/user', verifyTokenmiddleware, isAuth, getBrandByUserId)

module.exports = router;