/*
    ALUMNOS
    ruta: '/api/alumnos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require('../controllers/alumnos.controller')


const router = Router();

router.get('/', getAlumnos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del alumno es necesario').not().isEmpty(),
        //check('carrera', 'El id de la carrera debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearAlumno
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del alumno es necesario').not().isEmpty(),
        //check('carrera', 'El id de la carrera debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarAlumno
);

router.delete('/:id', validarJWT, eliminarAlumno);



module.exports = router;