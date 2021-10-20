/*
    Investigadores
    ruta: '/api/docentes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente
} = require('../controllers/docentes.controller')


const router = Router();

router.get('/', getDocentes);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del docente es necesario').not().isEmpty(),
        //check('usuario', 'El id del usuario debe de ser válido').isMongoId(),
        // check('carrera', 'El id de la carrera debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearDocente
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del alumno es necesario').not().isEmpty(),
        //check('usuario', 'El id del usuario debe de ser válido').isMongoId(),
        //check('carrera', 'El id de la carrera debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarDocente
);

router.delete('/:id', validarJWT, eliminarDocente);



module.exports = router;