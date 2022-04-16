const { response } = require("express");
const { ObjectId }=require('mongoose').Types

const {Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas =[
    'usuarios',
    'categorias',
    'productos',
    'productosPorCategorias',
    'roles'
];

const buscarUsuarios = async (termino= '', res=response)=>{
    
    const esMongoId = ObjectId.isValid(termino);
    
    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]: []
        });   
    };

    const regex = new RegExp(termino, 'i'); //expresion regular, lo hace insensible
    
    const usuario =await Usuario.find({
        $or: [{nombre:regex},{correo:regex}],
        $and: [{estado:true}]
    });

    res.json({
        results:usuario
    })
}

const buscarCategorias = async(termino='',res=response)=>{
    const esMongoId=ObjectId.isValid(termino)
    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]: []
        });   
    };
    const regex = new RegExp(termino, 'i'); //expresion regular, lo hace insensible
    
    const categoria =await Categoria.find({nombre:regex,estado:true});

    res.json({
        results:categoria
    })
}

const buscarProductos = async (termino= '', res=response)=>{
    
    const esMongoId = ObjectId.isValid(termino);
    
    if (esMongoId) {
        const producto = await Producto.findById(termino)
            .populate('categoria','nombre');
        return res.json({
            results:(producto)?[producto]: []
        });   
    };

    const regex = new RegExp(termino, 'i'); //expresion regular, lo hace insensible
    
    const producto =await Producto.find({
        $or: [{nombre:regex}],
        $and: [{estado:true}],
        //$and:[{cantidad>0]
    }).populate('categoria','nombre');

    res.json({
        results:producto
    })
}
const buscarProductosPorCategoria = async (termino= '', res=response)=>{
    
    const esMongoId = ObjectId.isValid(termino);
    
    if (esMongoId) {
        const producto = await Producto.find({categoria:ObjectId(termino)})
            .populate('categoria','nombre');
        return res.json({
            results:(producto)?[producto]: []
        });   
    };

    const regex = new RegExp(termino, 'i'); //expresion regular, lo hace insensible
    const id =await Categoria.find({nombre:regex,estado:true});
    console.log(id);


    const producto =await Producto.find({ categoria:id[0]._id})
    .populate('categoria','nombre');

    res.json({
        results:producto
    })
}




const buscar = (req, res=response)=>{
    const {coleccion, termino}=req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg:`Las validaciones permitidas son: ${coleccionesPermitidas}`
        });
    };

    switch (coleccion) {
       case  'usuarios':
        buscarUsuarios(termino,res);
       break;
       case  'categorias':
        buscarCategorias(termino,res);
       break;
       case  'productos':
           buscarProductos(termino,res);
       break;
       case  'productosPorCategorias':
        buscarProductosPorCategoria(termino,res);
        break;

       default:
           res.status(500).json({
               msg:'Se me olvido colocar esta busqueda'
           })
    }

}


module.exports={
    buscar
}