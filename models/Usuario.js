import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const usuarioSchema = mongoose.Schema({
    user:{
        type: String,
        required: true,
        trim: true
    },

    password:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    token:{
        type: String
    },

    confirmado: {
        type:Boolean,
        default: false
    }
})

usuarioSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
const Usuario = mongoose.model('Usuario', usuarioSchema )

export default Usuario