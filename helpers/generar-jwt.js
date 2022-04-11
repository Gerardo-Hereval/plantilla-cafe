const jwt =require('jsonwebtoken')


const generarJWT = (uid = '' ) => { //identificador unico de usuario por sus siglas en ingles uid
    
    return new Promise ( (resolve,reject)=>{
        
        const payload = { uid };

        jwt.sign(payload,process.env.SECRET0RPRIVATEKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else{
                resolve (token);
            }
        })
    })
}

module.exports= {
    generarJWT
}