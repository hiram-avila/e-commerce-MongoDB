import mongoose from 'mongoose';

const { Schema } = mongoose;

const CarritoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Nombre del modelo de usuarios
    required: true
  }
});

const Carrito = mongoose.model('Carrito', CarritoSchema);

export default Carrito;
