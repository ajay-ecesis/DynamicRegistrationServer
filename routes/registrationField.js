import express from 'express';
import { addNewRegistrationField, getRegistrationFields,getRegistrationFieldByBrand, getRegistrationFieldByManufacturer} from '../controllers/registrationField';
const router = express.Router();



 router.post('/RegistraionField/newField',addNewRegistrationField)

 router.get('/RegistraionField/getFields',getRegistrationFields)

 router.get('/RegistraionField/getRegistrationFieldByBrand',getRegistrationFieldByBrand)

 router.get('/RegistraionField/getRegistrationFieldByManufacturer',getRegistrationFieldByManufacturer)


module.exports = router;