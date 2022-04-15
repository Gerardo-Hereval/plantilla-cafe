const bcryptjs = require('bcryptjs');
const {response}=require('express');
const { json } = require('express/lib/response');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario= require('../models/usuario');


const login = async(req,res=response)=> {

    const { correo, password}= req.body;
    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario /password no son correctos - correo'
            });
        }

        //si el usuario esta activo en la BD
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario /password no son correctos - estado:false'
            });
        }

        //verificar la contraseña
        const validPassword= bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario /password no son correctos - Password mal'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
        
    };

};

const googleSingnIn= async (req, res=response)=>{
    const {id_token}=req.body;

    try {
        
        const {nombre, img, correo} =await googleVerify(id_token);
        
        let usuario=await Usuario.findOne({correo});

        if (!usuario) {
            //tengo que crearlo

            const data= {
                nombre,
                correo,
                numero:'',
                password:':p',
                img,
                rol: "USER",
                google:true
            };
            
            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario en DB 
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg:'Token de google no es valido'
        });
    }
}

module.exports={
    login,
    googleSingnIn
};