// Gettign the Newly created Mongoose Model we just created 
var Contacto = require('../models/Contact.model')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Contact = require('../models/Contact.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getContacts = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        var Contacts = await Contact.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Contacts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Contacts');
    }
}

exports.createContact = async function (contacto) {

    // var profesor = JSON.parse(contacto.profesor)
    // Creating a new Mongoose Object by using the new keyword
    var newContact = new Contacto({
        id: contacto.id,
        profesor: contacto.profesor,
        alumno: contacto.alumno,
        telefonoContacto: contacto.telefonoContacto,
        mailContacto: contacto.mailContacto,
        horario: contacto.horario,
        clase: contacto.clase,
        estado: 'Solicitada'
    })

    try {
        // Saving the User 
        var savedContact = await newContact.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Contact")
    }
}

exports.updateContact = async function (contacto) {

    console.log(contacto.id)
    var id = { id: contacto.id }

    try {
        //Find the old User Object by the Id    
        var oldContact = await Contacto.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Contact")
    }
    // If no old User Object exists return false
    if (!oldContact) {
        return false;
    }
    
    oldContact.estado = contacto.estado

    try {
        var savedContact = await oldContact.save()
        return savedContact;
    } catch (e) {
        throw Error("And Error occured while updating the Contact");
    }
}

exports.deleteContact = async function (id) {

    // Delete the User
    console.log("id mandado", id)
    try {
        var deleted = await Contacto.remove({
            id: id
        })
        console.log("Contacto", deleted)
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Contact Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Contact")
    }
}