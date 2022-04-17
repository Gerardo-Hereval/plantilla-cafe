const { Router }=require('express');
const { check } = require('express-validator');

const {validarCampos,validarArchivoSubir} = require ('../middlewares');

const { cargarArchivo, actualizarImgCloudunary, mostrarImg } = require('../controllers/uploads');
const { validarJWT, esAdminRole } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo );

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    validarJWT,
    esAdminRole,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])), //colocando la funcion sera para permitir que sea mas flexible
    validarCampos
],actualizarImgCloudunary );


router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])), //colocando la funcion sera para permitir que sea mas flexible
    validarCampos
], mostrarImg) 


module.exports=router;