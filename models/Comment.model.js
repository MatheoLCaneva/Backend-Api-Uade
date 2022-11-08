var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var CommentSchema = new mongoose.Schema({
    comentario: String,
    usuario: String,
    clase: String,
    estado: Boolean
})

CommentSchema.plugin(mongoosePaginate)
const Comment = mongoose.model('Comment', CommentSchema, "Comentarios")

module.exports = Comment;