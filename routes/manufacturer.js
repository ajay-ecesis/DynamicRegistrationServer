import express from 'express'
const router = express.Router();

import { updateManufacturer, getAllManufacturers,getManufacturerById,uploadMultiplePhotos, uploadCertificates,getManufacturerByUserId } from '../controllers/manufacturer';

import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'


router.post('/manufacturer/uploadCertificates',uploadCertificates)
router.post('/manufacturer/uploadMultiplePhotos',uploadMultiplePhotos)
router.get('/getManufacturers', verifyTokenmiddleware, isAuth, isAdmin, getAllManufacturers)
router.post('/getManufacturerById', verifyTokenmiddleware, isAuth, isAdmin, getManufacturerById)
router.put('/updateManufacturer', verifyTokenmiddleware, isAuth, isAdmin, updateManufacturer)
router.post('/manufacturer/user', verifyTokenmiddleware, isAuth, getManufacturerByUserId)

module.exports = router;