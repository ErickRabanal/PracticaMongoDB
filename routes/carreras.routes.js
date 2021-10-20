/*
    CARRERAS
    ruta: '/api/carreras'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCarrera,
    crearCarrera,
    actualizarCarrera,
    eliminarCarrera
} = require('../controllers/carreras.controller')


const router = Router();

router.get('/', getCarrera);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la carrera es necesario').not().isEmpty(),
        //check('usuario', 'El id del usuario debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearCarrera
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la carrera es necesario').not().isEmpty(),
        //check('usuario', 'El id del usuario debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarCarrera
);

router.delete('/:id', validarJWT, eliminarCarrera);



module.exports = router;