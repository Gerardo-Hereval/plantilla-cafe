const { Schema,model}= require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorios']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    numero:{
        type: Number,
        required:[true, 'El numero es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        tipo:['ADMIN','USER']
    },
    estado: {
        type: Boolean,
        default:true
    },
    google: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON=function(){
    const {__v,password,...usuario }= this.toObject();// se quitan password y __v y todo lo demas se guarda en usuario, aqui se modifina una funcion directamente
    return usuario;
}




module.exports = model('Usuario',UsuarioSchema);