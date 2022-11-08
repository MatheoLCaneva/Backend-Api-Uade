var express = require('express')
var router = express.Router()
var ClassController = require('../controllers/class.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
    res.send('Llegaste a la ruta de clases');
});
router.post('/create', ClassController.createClass)
router.get('/', ClassController.getClasses)
router.post('/classById', ClassController.getClassById)
router.put('/', ClassController.updateClass)
router.delete('/', ClassController.removeClass)
router.post('/sendMail', MailController.sendEmail)



// Export the Router
module.exports = router;