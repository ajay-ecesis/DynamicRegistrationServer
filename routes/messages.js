
import express from 'express'
import { listUserByRole,getMyMessages} from '../controllers/chat';
import { saveMessage } from '../controllers/savedMessage';
const router = express.Router();



router.post('/messages/listUsersByRole',listUserByRole)


router.post('/messages/getMyMessages',getMyMessages)

router.post('/messages/saveMessage',saveMessage)


module.exports = router;