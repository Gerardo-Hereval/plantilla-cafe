const express = require('express')

const cors = require('cors');

const { dbConection } = require('../database/config');



//crear en server la aplicacion de express
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;

        this.paths ={
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }
        

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
        
        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.buscar,     require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos,  require('../routes/productos'));
        this.app.use(this.paths.usuarios,   require('../routes/usuarios'));
    };

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};


module.exports=Server