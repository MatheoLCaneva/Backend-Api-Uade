var express = require('express')
var router = express.Router()
var CommentController = require('../controllers/comment.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function (req, res) {
    res.send('Llegaste a la ruta de comentarios');
});
router.post('/create', CommentController.createComment)
router.get('/', CommentController.getComments)
router.post('/classById', CommentController.getCommentsByClass)
router.put('/', CommentController.updateComment)
router.delete('/', CommentController.removeComment)
router.post('/sendMail', MailController.sendEmail)



// Export the Router
module.exports = router;