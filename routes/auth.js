const { Router }=require('express');
const { check } = require('express-validator');

const {validarCampos} = require ('../middlewares/validar-campos');

const { login, googleSingnIn } = require('../controllers/auth');


const router = Router();

  router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos
  ],login  );

  router.post('/google',[
    check('id_token','Id Token es necesario').not().isEmpty(),
    validarCampos
  ],googleSingnIn  );
 
  module.exports=router;