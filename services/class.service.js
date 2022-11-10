// Gettign the Newly created Mongoose Model we just created 
var Class = require('../models/Class.model')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getClasses = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        var Classes = await Class.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Classes;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Classes');
    }
}

exports.createClass = async function (clase) {

    // var profesor = JSON.parse(clase.profesor)
    // Creating a new Mongoose Object by using the new keyword
    var newClass = new Class({
        id: clase.id,
        materia: clase.materia,
        tipo: clase.tipo,
        frecuencia: clase.frecuencia,
        duracion: clase.duracion,
        precio: clase.precio,
        descripcion: clase.descripcion,
        profesor: clase.profesor
    })

    try {
        // Saving the User 
        var savedClass = await newClass.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Class")
    }
}

exports.updateClass = async function (clase) {

    console.log(clase.id)
    var id = { id: clase.id }

    try {
        //Find the old User Object by the Id    
        var oldClass = await Class.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Class")
    }
    // If no old User Object exists return false
    if (!oldClass) {
        return false;
    }
    //Edit the User Object
    oldClass.tipo = clase.tipo
    oldClass.frecuencia = clase.frecuencia
    oldClass.duracion = clase.duracion
    oldClass.precio = clase.precio
    oldClass.descripcion = clase.descripcion

    try {
        var savedClass = await oldClass.save()
        return savedClass;
    } catch (e) {
        throw Error("And Error occured while updating the Class");
    }
}

exports.deleteClass = async function (id) {

    // Delete the User
    console.log("id mandado", id)
    try {
        var deleted = await Class.remove({
            id: id
        })
        console.log("Clase", deleted)
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Class Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Class")
    }
}