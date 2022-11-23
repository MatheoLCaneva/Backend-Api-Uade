var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ContactSchema = new mongoose.Schema({
    id: String,
    profesor: Object,
    alumno: Object,
    telefonoContacto: String,
    mailContacto: String,
    horario: String,
    clase: Object,
    estado: String

})

ContactSchema.plugin(mongoosePaginate)
const Contact = mongoose.model('Contact', ContactSchema, "Reservas")

module.exports = Contact;