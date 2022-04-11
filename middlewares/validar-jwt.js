const { request,response } = require('express');
const jwt = require ('jsonwebtoken');




const validarJWT = (req=request,res=response,next)=>{

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        }) ;
    } //else {
        
    //}
    try {

        const {uid} = jwt.verify(token, process.env.SECRET0RPRIVATEKEY);

        req.uid=uid;
        


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }


}


module.exports={
    validarJWT
}