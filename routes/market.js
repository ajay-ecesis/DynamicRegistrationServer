import express from 'express'
const router = express.Router();

import {addMarket, updateMarket, getActiveMarkets, getMarkets, getMarketById, updateStatus} from '../controllers/market'
import {verifyTokenmiddleware, isAuth, isAdmin} from '../middlewares'

router.post('/market', verifyTokenmiddleware, isAuth, isAdmin, addMarket);
router.get('/market', verifyTokenmiddleware, isAuth, isAdmin, getMarkets);
router.get('/active/markets', getActiveMarkets);
router.put('/market', verifyTokenmiddleware, isAuth, isAdmin, updateMarket);
router.post('/get/market', verifyTokenmiddleware, isAuth, isAdmin, getMarketById);
router.put('/market/status', verifyTokenmiddleware, isAuth, isAdmin, updateStatus);

module.exports = router;