// Gettign the Newly created Mongoose Model we just created 
var Class = require('../models/Class.model')
var Contact = require('../models/Contact.model')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getClasses = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit,
        sort: { precio: 1 }
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
        profesor: clase.profesor,
        profesormail: clase.profesormail,
        valoracion: 0,
        cantValoraciones: 0,
        totalValoracion: 0
    })

    try {
        // Saving the User 
        var savedClass = await newClass.save();
        return savedClass
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Class")
    }
}

exports.updateClass = async function (clase) {

    var _id = { _id: clase._id }
    console.log(_id)
    try {
        //Find the old User Object by the Id    
        var oldClass = await Class.findOne(_id);
    } catch (e) {
        throw Error("Error occured while Finding the Class")
    }
    // If no old User Object exists return false
    if (!oldClass) {

        return false;

    }
    const keysClaseNueva = Object.keys(clase)
    const valuesClaseNueva = Object.values(clase)
    console.log(valuesClaseNueva.length)

    for (let i = 0; i < valuesClaseNueva.length; i++) {
        oldClass[keysClaseNueva[i]] = valuesClaseNueva[i]
    }

    console.log(oldClass)



    try {
        var savedClass = await oldClass.save()
        return savedClass;
    } catch (e) {
        throw Error("And Error occured while updating the Class");
    }
}

exports.updateClassRating = async function (clase) {

    var _id = { _id: clase._id }
    console.log(_id)
    try {
        //Find the old User Object by the Id    
        var oldClass = await Class.findOne(_id);
    } catch (e) {
        throw Error("Error occured while Finding the Class")
    }
    // If no old User Object exists return false
    if (!oldClass) {

        return false;

    }

    console.log('old clase', oldClass)

    const cantValoraciones = oldClass.cantValoraciones + 1
    const totalValoracion = oldClass.totalValoracion + clase.valoracion

    console.log(cantValoraciones, totalValoracion)

    oldClass.totalValoracion = totalValoracion
    oldClass.cantValoraciones = cantValoraciones
    oldClass.valoracion = (totalValoracion) / cantValoraciones

    try {
        var email = { mailContacto: clase.email }
        const Contacto = await Contact.findOne(email)
        console.log('contacto a cambiar', Contacto)
        Contacto.valoracion = clase.valoracion
        await Contacto.save()
    }
    catch (err){
        throw Error('Error al actualizar contacto')
    }

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
            _id: id
        })
        console.log("Clase", deleted)
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Class Could not be deleted")
        }
        return id;
    } catch (e) {
        throw Error("Error Occured while Deleting the Class")
    }
}