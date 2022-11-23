var express = require('express')
var router = express.Router()
var ContactController = require('../controllers/contact.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
    res.send('Llegaste a la ruta de contacto entre alumno y profesor');
});
router.post('/create', ContactController.createContact)
router.get('/', ContactController.getContacts)
// router.post('/classById', ContactController.getClassById)
router.put('/', ContactController.updateContact)
router.delete('/', ContactController.removeContact)
router.post('/sendMail', MailController.sendEmail)



// Export the Router
module.exports = router;