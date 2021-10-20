const { response } = require('express');

const Alumno = require('../models/alumno.model');




const getAlumnos = async(req, res) => {

    //const usuarios = await Usuario.find();
    //para la paginacion: usuarios/?desde=5 se utiliza & para concatenar parametros
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const pagina = parseInt(req.query.pagina);
    //const cantidad = parseInt(req.query.cantidad);
    const total = parseInt(req.query.total);
    const genero = req.query.genero;
    const nombre = req.query.nombre;
    const anios = req.query.anios;


    const [listaAlumnos, totalAlumnos] = await Promise.all([
        Alumno.find({
            sexo: genero,
            nombre: nombre,
            edad: anios,

        })
        .skip(pagina) //variable de paginacion
        .limit(total), // cuantos valores traer
        Alumno.countDocuments()
    ]);
    const totalpaginas = Math.ceil(totalAlumnos / total);
    res.json({
        ok: true,
        alumnos: listaAlumnos,
        total: totalAlumnos,
        paginas: totalpaginas,
    });
}



const crearAlumno = async(req, res = response) => {

    const uid = req.uid;
    const alumno = new Alumno({
        usuario: uid,
        ...req.body
    });


    try {

        const alumnoDB = await alumno.save();


        res.json({
            ok: true,
            alumno: alumnoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear alumno, consulte con el administrador'
        })
    }


}

const actualizarAlumno = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const alumno = await Alumno.findById(id);

        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'alumno no encontrado por id',
            });
        }

        const cambiosAlumno = {
            ...req.body,
            usuario: uid
        }

        const AlumnoActualizado = await Alumno.findByIdAndUpdate(id, cambiosAlumno, { new: true });


        res.json({
            ok: true,
            alumno: AlumnoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar Alumno, consulte con el administrador'
        })
    }

}

const eliminarAlumno = async(req, res = response) => {

    const id = req.params.id;

    try {

        const alumno = await Alumno.findById(id);

        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no encontrado por id',
            });
        }

        await Alumno.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Alumno eliminado de la base de datos'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Alumno no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}