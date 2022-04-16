const { response } = require('express');
const { Router }=require('express');
const { check } = require('express-validator');


const { obtenerProductos, 
    obtenerProductoPorId, 
    crearProducto, 
    modificarProducto, 
    borrarProducto} = require('../controllers/productos');
const { existeProductoPorId,existeCategoriaPorId } = require('../helpers/db-validators');

const {validarCampos, validarJWT, esAdminRole} = require ('../middlewares');



const router = Router();    

//obtener productos
router.get('/',obtenerProductos);

//obtener productos por Id
router.get('/:id',[
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(existeProductoPorId ),
    validarCampos
],obtenerProductoPorId );

//crear productos
router.post('/',[
    validarJWT,
    esAdminRole,
    validarCampos,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un Id de Moongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId ),
    validarCampos
],crearProducto );

//modificar producto
//Poner más seguridad por sí modifica la categoría
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId ),
    validarCampos
],modificarProducto);


//Borrar producto

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId ),
    validarCampos
],borrarProducto )

module.exports= router;