const express = require('express')

const cors = require('cors');

const { dbConection } = require('../database/config');



//crear en server la aplicacion de express
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath   = '/api/usuarios';
        this.authPath       = '/api/auth';

        //conexion a base datos

        this.conectarDB();

        //middlewares son funciones que se ejecutaran en cuando carguemos
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    };

    async conectarDB (){
        await dbConection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseio del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        
        this.app.use(this.authPath,require('../routes/auth'));
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