// Gettign the Newly created Mongoose Model we just created 
var Comment = require('../models/Comment.model')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getComments = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        var Comments = await Comment.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return  Comments;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Comments');
    }
}

exports.createComment = async function (comment) {

    // Creating a new Mongoose Object by using the new keyword
    var newComment = new Comment({
        comentario: comment.comentario.toUpperCase(),
        usuario: comment.usuario,
        clase: comment.clase,
        estado: false
    })

    try {
        // Saving the User 
        var savedComment = await newComment.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Comment")
    }
}

exports.updateState = async function (comment) {

    var filtro = { clase: comment.clase, usuario: comment.usuario } 

    try {
        //Find the old User Object by the Id    
        var oldComment = await Comment.findOne(filtro);
    } catch (e) {
        throw Error("Error occured while Finding the Comment")
    }
    // If no old User Object exists return false
    if (!oldComment) {
        return false;
    }
    //Edit the User Object
    oldComment.estado = true

    try {
        var savedComment = await oldComment.save()
        return savedComment;
    } catch (e) {
        throw Error("And Error occured while updating the Comment");
    }
}

exports.deleteComment = async function (clase, usuario) {

    // Delete the User
    console.log("clase: ", clase, " | Usuario: ", usuario)
    try {
        var deleted = await Comment.remove({
            clase: clase,
            usuario: usuario
        })
        console.log("Comment", deleted)
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Comment Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Comment")
    }
}