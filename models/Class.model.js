var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const User = require('./User.model')

var ClassSchema = new mongoose.Schema({
    id: String,
    materia: String,
    tipo: String,
    frecuencia: String,
    duracion: String,
    precio: String,
    descripcion: String,
    profesor: Object
})

ClassSchema.plugin(mongoosePaginate)
const Class = mongoose.model('Class', ClassSchema, "Clases")

module.exports = Class;