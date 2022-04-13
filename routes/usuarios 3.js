const { Router }=require('express');
const { check } = require('express-validator');

const { validarCampos }= require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch, usuariosDelete}=require('../controllers/usuarios');

const router = Router();

  router.get('/', usuariosGet );
    
  router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
  ], usuariosPut);

  
  router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),//validacion de email
    check('password','El password es obligatorio y más de 6 letras').isLength({min:6}),
    check('numero','El numero es obligatorio o hacen falta numeros, corroborar numero').isNumeric().isLength({min:10}).not().isEmpty(),
    check('correo','El correo no es valido').isEmail().custom(emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN','USER']), //ejemplo
    check('rol').custom(esRolValido),
    validarCampos
  ], usuariosPost);

  
  router.patch('/:id',usuariosPatch);

  router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),  
    validarCampos 
  ],usuariosDelete );
  


module.exports =router;

