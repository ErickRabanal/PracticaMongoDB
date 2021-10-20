/*
    Path: /api/matriculas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMatriculas,
    crearMatricula,
    eliminarMatricula,
    actualizarMatricula
} = require('../controllers/matriculas.controller')
const router = Router();

router.get('/', getMatriculas);
router.post('/', [
        validarJWT,
        check('ciclo', 'El ciclo es obligatorio').not().isEmpty(),
        // check('usuario', 'El id usuario es obligatorio').not().isEmpty(),
        //check('alumno', 'El id de alumno es obligatorio').not().isEmpty(),
        //check('curso', 'El id de curso es obligatorio').not().isEmpty(),
        //check('docente', 'El id de docente es obligatorio').not().isEmpty(),

        validarCampos,
    ],
    crearMatricula);
router.put('/:id', [
        validarJWT,
        check('ciclo', 'El ciclo es obligatorio').not().isEmpty(),
        //check('usuario', 'El id usuario es obligatorio').not().isEmpty(),
        //check('alumno', 'El id de alumno es obligatorio').not().isEmpty(),
        //check('curso', 'El id de curso es obligatorio').not().isEmpty(),
        //check('docente', 'El id de docente es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarMatricula);

router.delete('/:id', validarJWT, eliminarMatricula);

module.exports = router;