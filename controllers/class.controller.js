var ClassService = require('../services/class.service');
var UserImgService =require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClasses = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    console.log(page)
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Classes = await ClassService.getClasses({}, page, limit)
        console.log(Classes)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Classes, message: "Succesfully Classes Recieved"});
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
        var Classes = await ClassService.getClasses(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Classes, message: "Succesfully Class Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClass = async function (req, res) {
    // Req.Body contains the form submit values.{}
    console.log("llegue al controller",req.body)
    console.log(req.body)
    // console.log(typeof(req.headers.profesor))
    var Class = {
        id: req.body.id,
        materia: req.body.materia,
        tipo: req.body.tipo,
        frecuencia: req.body.frecuencia ,
        duracion: req.body.duracion ,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        profesor: req.body.profesor
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClass = await ClassService.createClass(Class)
        return res.status(201).json({createdClass   , message: "Succesfully Created Class"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateClass = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }

    var Clase = {
        id: req.body.id,
        tipo: req.body.tipo ? req.body.tipo : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        precio: req.body.precio ? req.body.precio : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null

    }
    try {
        var updatedClass = await ClassService.updateClass(Clase)
        return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated Class"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClass = async function (req, res, next) {

    var id = req.body.id;
    console.log(id)
    try {
        var deleted = await ClassService.deleteClass(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
