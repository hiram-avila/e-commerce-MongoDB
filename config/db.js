import mongoose from 'mongoose'

const conectarDb = async( ) => {
    try {
            await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })


        console.log('base de datos conectada')

    } catch (error) {
        console.log(error)
        process.exit(1);

    }
}


export default conectarDb