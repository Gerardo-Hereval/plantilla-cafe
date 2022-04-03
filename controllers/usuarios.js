const { response,request } = require('express');

//const body=request.body;

const usuariosGet=(req=request, res=response)=> {

  const { q, nombre='No name', apikey, page= 1, limit} = req.query;//es para ingresar argumentos extras
    res.json({
        "ok":true,
        "msg": "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
  };

  const usuariosPut =  (req, res)=> {
    
    const id= req.params.id;
    
    res.status(500).json({
        "ok":true,
        "msg": "put API - controlador",
        id
    });
  };

  const usuariosPost =   (req, res)=> {

    const {nombre ,edad} = req.body;

    res.status(201).json({
        "ok":true,
        "msg": "post API - controlador",
        nombre,
        edad
    });
  };

  const usuariosPatch =   (req, res)=> {
    res.json({
        "ok":true,
        "msg": "patch API - controlador"
    });
  };

  const usuariosDelete = (req, res)=> {
    res.json({
        "ok":true,
        "msg": "delete API - controlador"
    });
  };



  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }