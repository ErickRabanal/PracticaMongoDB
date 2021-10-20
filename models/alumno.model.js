const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
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
    sexo: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true

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


}, { collection: 'alumnos' });


AlumnoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Alumno', AlumnoSchema);