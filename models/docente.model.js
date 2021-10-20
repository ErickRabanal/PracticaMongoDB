const { Schema, model } = require('mongoose');

const Docenteschema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    edad: {
        type: String,

    },
    sexo: {
        type: String,

    },
    direccion: {
        type: String,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    carrera: {
        type: Schema.Types.ObjectId,
        ref: 'Carrera',
        required: true

    },



}, { collection: 'docentes' });


Docenteschema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Docente', Docenteschema);