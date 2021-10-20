const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    horasP: {
        type: Number,
        required: true,

    },
    horasT: {
        type: Number,
        required: true
    },
    creditos: {
        type: Number,
        required: true
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
    docente: {
        type: Schema.Types.ObjectId,
        ref: 'Docente',
        required: true
    },


}, { collection: 'cursos' });


CursoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Curso', CursoSchema);