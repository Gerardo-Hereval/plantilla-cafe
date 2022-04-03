const express = require('express')

const cors = require('cors')



//crear en server la aplicacion de express
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares son funciones que se ejecutaran en cuando carguemos
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    };

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseio del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        //cambio de path
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    };

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};


module.exports=Server