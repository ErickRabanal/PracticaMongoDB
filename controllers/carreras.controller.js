const { response } = require('express');

const Carrera = require('../models/carrera.model');

const getCarrera = async(req, res = response) => {

    const carreras = await Carrera.find()
        .populate('usuario', 'nombre img')
        // .populate('carrera', 'nombre img')


    res.json({
        ok: true,
        carreras: carreras
    })
}

const crearCarrera = async(req, res = response) => {

    const uid = req.uid;
    const carrera = new Carrera({
        usuario: uid,
        ...req.body
    });


    try {

        const carreraDB = await carrera.save();


        res.json({
            ok: true,
            carrera: carreraDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear carrera, consulte con el administrador'
        })
    }


}

const actualizarCarrera = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const carrera = await Alumno.findById(id);

        if (!carrera) {
            return res.status(404).json({
                ok: true,
                msg: 'carrera no encontrada por id',
            });
        }

        const cambiosCarrera = {
            ...req.body,
            usuario: uid
        }

        const CarreraActualizado = await Carrera.findByIdAndUpdate(id, cambiosCarrera, { new: true });


        res.json({
            ok: true,
            alumno: CarreraActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar carrera, consulte con el administrador'
        })
    }

}

const eliminarCarrera = async(req, res = response) => {

    const id = req.params.id;

    try {

        const carrera = await Carrera.findById(id);

        if (!carrera) {
            return res.status(404).json({
                ok: true,
                msg: 'CArrera no encontrado por id',
            });
        }

        await Carrera.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Carrera borrada de la base de datos'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Carrera no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getCarrera,
    crearCarrera,
    actualizarCarrera,
    eliminarCarrera
}