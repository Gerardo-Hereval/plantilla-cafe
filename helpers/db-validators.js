const { Categoria,Usuario,Producto } = require('../models');
const Role = require ('../models/rol');



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
  
  const existeCategoriaPorId =async (id = '')=>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
      throw new Error(`El id: ${id}, no existe`);
    }
  }

const existeProductoPorId =async (id = '')=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
      throw new Error(`El id: ${id}, no existe`);
    }
  }

  const coleccionesPermitidas = (coleccion = '',colecciones = [])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
      throw new Error(`La coleccion: ${incluida}, no esta permitida, ${colecciones}`);
    };
    return true; //solo se pone aqui por la forma en la que se trabaja en routers
  }




module.exports={
      esRolValido,
      emailExiste,
      existeUsuarioPorId,
      existeCategoriaPorId,
      existeProductoPorId,
      coleccionesPermitidas
  }