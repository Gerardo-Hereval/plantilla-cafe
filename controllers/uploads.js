const path = require('path');
const fs  = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const { response } = require('express');

const { subirArchivo } = require("../helpers");


const { Usuario,Producto  }=require ('../models');


const cargarArchivo = async (req,res=response) => {

    
    try {
        
        //const pathCompleto= await subirArchivo(req.files, undefined,'imagenes'); //por si no quieres que cambiar las extensiones
        //const pathCompleto= await subirArchivo(req.files, ['txt'],'imagenes'); //para poder agregar solo un tipo de extension
        
        const nombre= await subirArchivo(req.files);
        res.json ({
         nombre
        })
    } catch (msg) {
        res.status(400).json({msg});
    }

};

const actualizarImg = async (req, res=response)=>{

    const { id, coleccion}= req.params
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });   
            };
            break;

            case 'productos' :  
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });   
            };
            break;
    
        default:
            return res.status(500).json({mgs: 'Se me olvido validar esto'});
        }
        
        //limpiar imagenes previas
        if (modelo.img) {
            const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img)
            if (fs.existsSync(pathImagen)) {
                   fs.unlinkSync(pathImagen);
            }
            
    }

    const nombre= await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre; 
    
    
    await modelo.save();
    
    res.json({modelo})

};

const mostrarImg = async (req,res=response)=>{
    
    const {id, coleccion}= req.params;
    const pathNoImagen= path.join(__dirname,'../assets/img/no-image.jpg');

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });   
            };
            break;

            case 'productos' :  
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });   
            };
            break;
    
        default:
            return res.status(500).json({mgs: 'Se me olvido validar esto'});
    }
        
    if (modelo.img) {
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img)
        if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
        }
    }


    // if (!modelo) {
    //     const pathNoImagen= path.join(__dirname,'../assets/img','no-image.jpg');
    //     return res.sendFile(pathNoImagen)
    // }

    res.sendFile(pathNoImagen)

        
    
};


const actualizarImgCloudunary = async (req, res=response)=>{

    const { id, coleccion}= req.params
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });   
            };
            break;

            case 'productos' :  
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });   
            };
            break;
    
        default:
            return res.status(500).json({mgs: 'Se me olvido validar esto'});
        }
        
        //limpiar imagenes previas
        if (modelo.img) {
            const nombreArr =modelo.img.split('/');
            const [public_id]    =nombreArr[nombreArr.length -1].split('.')  ;
            cloudinary.uploader.destroy(`cafeteriaDB/${coleccion}/${public_id}`);
        }

    const {tempFilePath}=req.files.archivo
    // const img=path.join(__dirname,coleccion,tempFilePath)
    const {secure_url}=await cloudinary.uploader.upload(tempFilePath,{folder:`cafeteriaDB/${coleccion}`});
    modelo.img=secure_url;
    await modelo.save();
    res.json(modelo)

};

module.exports= {
    cargarArchivo,
    actualizarImg,
    mostrarImg,
    actualizarImgCloudunary
}