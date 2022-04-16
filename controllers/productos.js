const { response } = require("express");

const {Producto, Categoria}=require('../models')

const obtenerProductos = async (req, res=response) =>{

    const {limite= 5, desde = 0} = req.query;
    const query = {estado:true};

    const productos = await Promise.all([
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        productos
    });
};


const obtenerProductoPorId = async (req,res=response)=>{
    const {id}= req.params;
    const producto= await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre');

    res.json(producto);
};


const crearProducto = async (req,res=response)=>{
    const {estado, usuario,...body}=req.body;
    const nombre= body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre}, ya existe`
        });
    };
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    };
    console.log(data);
    const producto = new Producto(data);

    await producto.save();
    res.status(201).json(producto);
};

//poner más seguridad por si modifica la categoria
modificarProducto = async (req, res=response)=>{
    const {id}=req.params;
    const {estado, usuario,...data}=req.body;

    if (data.nombre) {
        data.nombre=data.nombre.toUpperCase();
    }
    data.usuario=req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data, {new: true});
    res.status(200).json(producto);

};

borrarProducto = async(req, res=response)=>{
    const {id}=req.params;
    
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.status(200).json(producto)
};


module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    borrarProducto 
}

