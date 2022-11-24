var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: String,
    apellido: String,
    email: String,
    password: String,
    date: Date,
    birth: String,
    rol: String,
    tel: String,
    title: String,
    experience: String,
    estudios: Array,
    imgUser: String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema, "users")

module.exports = User; 