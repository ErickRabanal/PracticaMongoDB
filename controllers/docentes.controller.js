const { response } = require('express');

const Docente = require('../models/docente.model');

const getDocentes = async(req, res) => {

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


    const [listaDocentes, totalDocentes] = await Promise.all([
        Docente.find({
            sexo: genero,
            nombre: nombre,
            edad: anios,

        })
        .skip(pagina) //variable de paginacion
        .limit(total), // cuantos valores traer
        Docente.countDocuments()
    ]);
    const totalpaginas = Math.ceil(totalDocentes / total);
    res.json({
        ok: true,
        docentes: listaDocentes,
        total: totalDocentes,
        paginas: totalpaginas,
    });
}



const crearDocente = async(req, res = response) => {

    const uid = req.uid;
    const docente = new Docente({
        usuario: uid,
        ...req.body
    });


    try {

        const docenteDB = await docente.save();


        res.json({
            ok: true,
            docente: docenteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear docente, consulte con el administrador'
        })
    }


}

const actualizarDocente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const docente = await Docente.findById(id);

        if (!docente) {
            return res.status(404).json({
                ok: true,
                msg: 'docente no encontrado por id',
            });
        }

        const cambiosDocente = {
            ...req.body,
            usuario: uid
        }

        const DocenteActualizado = await Docente.findByIdAndUpdate(id, cambiosDocente, { new: true });


        res.json({
            ok: true,
            alumno: DocenteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar docente, consulte con el administrador'
        })
    }

}

const eliminarDocente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const docente = await Docente.findById(id);

        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'Docente no encontrado por id ',
            });
        }

        await Docente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Docente eliminado de la base de datos'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Docente no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}