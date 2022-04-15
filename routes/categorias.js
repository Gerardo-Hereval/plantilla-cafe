const { Router, response }=require('express');
const { check } = require('express-validator');


const { crearCategoria,obtenerCategorias, obtenerCategoriaPorId, modificarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const {validarCampos, validarJWT, esAdminRole} = require ('../middlewares');



const router = Router();    

//Este es el path {{url}}/api/categorias

//obtener todas las categorias -publico
router.get('/',obtenerCategorias);//hacer middleweare personalisado para el ID


//obtener una categoria por id -publico
router.get('/:id',[
    check('id','No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos],
    obtenerCategoriaPorId);
 
//Crear categoria - privado - cualquier persona con un token valido y solo que sean admin
router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos], 
    crearCategoria);

//Modificar categoria - privado - cualquier persona con un token valido y solo que sean admin
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    check('id','No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos], 
    modificarCategoria );


//Borar una categoria - privado - cualquier persona con un token valido y solo que sean admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos],
borrarCategoria );

  module.exports=router;