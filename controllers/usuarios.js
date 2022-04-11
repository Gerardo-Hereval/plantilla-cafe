const { response,request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


//const body=request.body;

const usuariosGet=async (req=request, res=response)=> {

  
  const {limite =5,desde=0}=req.query;
  const query = { estado:true};
  
  const [total, usuarios]= await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite)) 
  ]);

  res.json({
    total,
    usuarios
  });
  };

  const usuariosPut = async (req, res=response)=> {
    
    const {id}= req.params;
    const {_id,password,google,correo,...resto}=req.body;

    //TODO validar contra base de datos
    if (password){
          // encriptar la contraseña
      const salt = bcryptjs.genSaltSync();//numero de vueltas de encriptacion por default son 10
      resto.password=bcryptjs.hashSync(password,salt);
    };

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    
    res.json(usuario);
  };

  const usuariosPost =  async (req, res=response)=> {

    

    const {nombre, numero, correo, password, rol} = req.body;
    const usuario= new Usuario({nombre, numero, correo, password, rol});

    //verificar si el correo existe
    //se movio verificacion a /routes/usuarios

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();//numero de vueltas de encriptacion por default son 10
    usuario.password=bcryptjs.hashSync(password,salt);


    //guardar en BD
    await usuario.save(); //para grabar en base de datos

    res.json({
        usuario
    });
  };

  const usuariosPatch =   (req, res)=> {
    res.json({
        "ok":true,
        "msg": "patch API - controlador"
    });
  };

  const usuariosDelete = async (req, res)=> {

    const { id }=req.params;

    const uid =req.uid;

    //fisicamente lo borramos, no se recomienda

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({usuario,uid});
  };



  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }