const Role = require ('../models/rol');
const Usuario = require('../models/usuario');



const esRolValido = async(rol= '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la BD`);//error personalizado que se quede en el custom
    }
  };

const emailExiste = async(correo= '')=>{
  const existeEmail = await Usuario.findOne({correo});
  if (existeEmail){
    throw new Error(`El correo: ${correo}, ya esta registrado`);
    }
  };

  const existeUsuarioPorId =async (id = '')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
      throw new Error(`El id: ${id}, no existe`);
    }
  }
  


module.exports={
      esRolValido,
      emailExiste,
      existeUsuarioPorId
  }