const { response } = require('express');
const {Categoria }= require('../models');




const obtenerCategorias = async (req,res=response)=>{

    const {limite=5,desde=0}=req.query;
    const query= {estado:true};

    const categorias=await Promise.all([
        Categoria.find(query)
        .populate({path:'usuario',select:'nombre'})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        categorias
        });

};

//obtenerCategoria -populate {}
const obtenerCategoriaPorId = async(req,res=response)=>{
    const {id}=req.params;
    const categoria= await Categoria.findById(id).
    populate({path:'usuario',select:'nombre'})
    res.json(categoria)

}


const crearCategoria = async(req,res=response)=>{
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });
    
    
        if (categoriaDB) {
            return res.status(400).json({
                msg:`La categoria ${categoriaDB.nombre}, ya existe`
            });    
        }
        
                //generar la data a guardar
                const data = {
                    nombre,
                    usuario: req.usuario._id
                };
        
                const categoria = new Categoria(data);
        
                //guardar db
        
                await categoria.save();
                res.status(201).json(categoria);
};

//ModificarCategoria
modificarCategoria = async (req,res=response)=>{
    const {id}=req.params;
    const {estado, usuario, ...data}=req.body;//.nombre.toUpperCase();

    data.nombre=data.nombre.toUpperCase();
    data.usuario=req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true});
    res.status(200).json(categoria);
};


//borarCategoria -estado:false

borrarCategoria = async(req, res=response)=>{
    const {id}=req.params;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new: true});

    res.status(200).json(categoria);
};



module.exports= {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    modificarCategoria,
    borrarCategoria
}