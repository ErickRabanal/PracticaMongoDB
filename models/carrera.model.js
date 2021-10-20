const { Schema, model } = require('mongoose');

const CarreraSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    sede: {
        type: String,
        required: true,
        default: "Cajamarca"
    },



}, { collection: 'carreras' });


CarreraSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Carrera', CarreraSchema);