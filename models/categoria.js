const { Schema, model}=require('mongoose');

const CategoriaSchema = Schema ({
    nombre:{
        type: String, 
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required:[true, 'El estado es obligatorio']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario', //así como esta en el export del esquema así debe estar aqui
        required:[true, 'El usuario es obligatorio']
    }
});

CategoriaSchema.methods.toJSON=function(){
    const {__v, estado,...data }= this.toObject();// se quitan password y __v y todo lo demas se guarda en usuario, aqui se modifina una funcion directamente
    //categoria.uid=_id;
    return data;
}



module.exports = model ('Categoria', CategoriaSchema);