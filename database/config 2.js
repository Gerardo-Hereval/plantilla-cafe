const mongoose = require('mongoose');

const dbConection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log ('Base de datos online')
        
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la base de datos');
        
    }

};


module.exports={
    dbConection
}