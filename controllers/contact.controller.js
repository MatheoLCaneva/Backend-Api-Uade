var ContactService = require('../services/contact.service');
var UserImgService =require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getContacts = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    console.log(page)
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Contacts = await ContactService.getContacts({}, page, limit)
        console.log(Contacts)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contacts, message: "Succesfully Contacts Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getClassById = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    let filtro= req.body
        try {
        var Classes = await ContactService.getClasses(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Classes, message: "Succesfully Class Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createContact = async function (req, res) {
    // Req.Body contains the form submit values.{}
    console.log("llegue al controller",req.body)
    // console.log(typeof(req.headers.profesor))
    var Contact = {
        id: req.body.id,
        profesor: req.body.profesor,
        alumno: req.body.alumno,
        telefonoContacto: req.body.telefonoContacto ,
        mailContacto: req.body.mailContacto ,
        horario: req.body.horario,
        clase: req.body.clase
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdContact = await ContactService.createContact(Contact)
        return res.status(201).json({createdContact   , message: "Succesfully Created Contact"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Contact Creation was Unsuccesfull"})
    }
}

exports.updateContact = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }

    var Contact = {
        id: req.body.id,
        estado: req.body.estado
    }
    try {
        var updatedContact = await ContactService.updateContact(Contact)
        return res.status(200).json({status: 200, data: updatedContact, message: "Succesfully Updated Contact"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeContact = async function (req, res, next) {

    var id = req.body.id;
    console.log(id)
    try {
        var deleted = await ContactService.deleteContact(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
