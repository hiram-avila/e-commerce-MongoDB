import Usuario from "../models/Usuario.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


const registrar = async (req, res) => {

    const { email, user, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ msg: "Usuario ya registrado" });
    }
    
    try {
      const passwordHash = await bcrypt.hash(password, 10);
    
      const usuario = new Usuario({
        email,
        user,
        password: passwordHash,
      });

      await usuario.save();
    

      // Enviar una respuesta al cliente
      res.json({
        msg: 'registro exitoso',
        usuario
      });

    } catch (error) {
      // Manejar el error
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar al usuario en la base de datos por su correo electrónico
      const usuario = await Usuario.findOne({ email });
      console.log(usuario, 'linea 47')
  
      if (!usuario) {
        return res.status(403).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar si la contraseña es correcta
      const passwordMatch = await usuario.comparePassword(password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas, contraseña incorrecta' });
      }
  
      // Crear el payload del token
      const userId = usuario._id
  
      // Generar el token con una clave secreta y una duración de validez
      const token = jwt.sign({userId}, process.env.JWT_secret, { expiresIn: '30d' });
      console.log(token)
  
      // Responder con el token y cualquier otra información que desees enviar al frontend
      res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
      console.log(error);
    }
  };

export {
    registrar,
    login
}