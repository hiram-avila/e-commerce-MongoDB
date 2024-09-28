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

    redisClient.del(email);

    res.json({
      msg: 'Registro exitoso',
      usuario,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en Redis primero
    redisClient.get(email, async (err, data) => {
      if (err) throw err;

      if (data) {
        // Si el usuario está en caché, obtenemos la información desde Redis
        const usuario = JSON.parse(data);
        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Credenciales inválidas, contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: usuario._id }, process.env.JWT_secret, { expiresIn: '30d' });

        return res.status(200).json({ token, message: 'Inicio de sesión exitoso (desde caché)' });
      } else {
        // Si el usuario no está en caché, buscamos en la base de datos
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
          return res.status(403).json({ message: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Credenciales inválidas, contraseña incorrecta' });
        }

        // Guardar la información del usuario en Redis (con un TTL de 1 hora)
        redisClient.setex(email, 3600, JSON.stringify(usuario));

        const token = jwt.sign({ userId: usuario._id }, process.env.JWT_secret, { expiresIn: '30d' });

        res.status(200).json({ token, message: 'Inicio de sesión exitoso (desde DB)' });
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    console.log(error);
  }
};
export {
    registrar,
    login
}