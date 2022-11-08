var CommentService = require('../services/comment.service');
var UserImgService = require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getComments = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    console.log(page)
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Comments = await CommentService.getComments({}, page, limit)
        console.log(Comments)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({
            status: 200,
            data: Comments,
            message: "Succesfully Comments Recieved"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}
exports.getCommentsByClass = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {
        id: req.body.id
    }
    try {
        var Classes = await CommentService.getClasses(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({
            status: 200,
            data: Classes,
            message: "Succesfully Class Recieved"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.createComment = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    var Comment = {
        comentario: req.body.comentario,
        clase: req.body.clase,
        usuario: req.body.usuario
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdComment = await CommentService.createComment(Comment)
        return res.status(201).json({
            createdComment,
            message: "Succesfully Created Comment"
        })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({
            status: 400,
            message: "Comment Creation was Unsuccesfull"
        })
    }
}

exports.updateComment = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.clase || !req.body.usuario) {
        return res.status(400).json({
            status: 400.,
            message: "User and class must be present"
        })
    }

    var Comment = {
        clase: req.body.clase,
        usuario: req.body.usuario 
    }
    try {
        var updatedComment = await CommentService.updateState(Comment)
        return res.status(200).json({
            status: 200,
            data: updatedComment,
            message: "Succesfully Updated Comment"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }
}

exports.removeComment = async function (req, res, next) {

    var clase = req.body.clase
    var usuario = req.body.usuario

    try {
        var deleted = await CommentService.deleteComment(clase, usuario);
        res.status(200).send("Succesfully Deleted... ", deleted);
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}