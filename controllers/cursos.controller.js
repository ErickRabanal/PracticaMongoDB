const { response } = require('express');

const Curso = require('../models/curso.model');

const getCurso = async(req, res = response) => {

    const cursos = await Curso.find()
        .populate('usuario', 'nombre img')
        //.populate('curso', 'nombre img')


    res.json({
        ok: true,
        cursos: cursos
    })
}

const crearCurso = async(req, res = response) => {

    const uid = req.uid;
    const curso = new Curso({
        usuario: uid,
        ...req.body
    });


    try {

        const cursoDB = await curso.save();


        res.json({
            ok: true,
            carrera: cursoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear curso, consulte con el administrador'
        })
    }


}

const actualizarCurso = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const curso = await Alumno.findById(id);

        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'curso no encontrado por id',
            });
        }

        const cambiosCurso = {
            ...req.body,
            usuario: uid
        }

        const CursoActualizado = await Curso.findByIdAndUpdate(id, cambiosCurso, { new: true });


        res.json({
            ok: true,
            alumno: CursoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar curso, consulte con el administrador'
        })
    }

}

const eliminarCurso = async(req, res = response) => {

    const id = req.params.id;

    try {

        const curso = await Curso.findById(id);

        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'Curso no encontrado por id',
            });
        }

        await Curso.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Curso borrado de la base de datos'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'curso no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}