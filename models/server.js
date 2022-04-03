const express = require('express')


//crear en server la aplicacion de express
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;

        //middlewares son funciones que se ejecutaran en cuando carguemos
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    };

    middlewares(){
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api',  (req, res)=> {
            res.send('Hello World');
          });
    };

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};


module.exports=Server