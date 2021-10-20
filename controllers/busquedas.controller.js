//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const Alumno = require('../models/alumno.model');
const Carrera = require('../models/carrera.model');
const Curso = require('../models/curso.model');
const Docente = require('../models/docente.model');
const Matricula = require('../models/matricula.model');



const busquedaTotal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    const [usuarios, alumnos, carreras, curso, docente, matricula] = await Promise.all([
        Usuario.find({ nombre: miRegExp }), // la busqueda es por nombre
        Alumno.find({ nombre: miRegExp }),
        Carrera.find({ nombre: miRegExp }),
        Curso.find({ nombre: miRegExp }),
        Docente.find({ nombre: miRegExp }),
        Matricula.find({ nombre: miRegExp }),
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios,
        alumnos,
        carreras,
        curso,
        docente,
        matricula
    });

}

//estructura de la peticion 
const busquedaColeccion = async(req, res = response) => {

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda;
    const miRegExp = new RegExp(busqueda, 'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({ nombre: miRegExp })

            break;
        case 'carreras':
            data = await Alumno.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img');
            break;
        case 'alumnos':
            data = await Carrera.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img')
                //.populate('proyecto', 'nombre img');
            break;
        case 'cursos':
            data = await Curso.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img')
                //.populate('proyecto', 'nombre img');
            break;
        case 'alumnos':
            data = await Alumno.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img')
                //.populate('proyecto', 'nombre img');
            break;
        case 'matriculas':
            data = await Matricula.find({ nombre: miRegExp })
                .populate('usuario', 'nombre img')
                //.populate('proyecto', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/carreras/alumnos/docente/curos/matricula"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });

}





module.exports = {
    busquedaTotal,
    busquedaColeccion
}