import Carrito from "../models/Carrito.js";

const addItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, price, category, image } = req.body;
        
    
        // Crear el objeto del producto en el carrito
        const producto = new Carrito({
            title,
            price,
            category,
            image,
            user: userId
          });
      
        // Guardar el producto en la base de datos
        await producto.save();
    
        // Responder con un mensaje de éxito u otra información que necesites
        res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al agregar el producto al carrito' });
        console.log(error)
    }
};

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Carrito.find().where('user').equals(req.userId)
        res.json({
           msg: 'productos obtenidos',
           productos
        })
        
    } catch (error) {
        res.send('hay error')
    }
        
}

const deleteProductos = async (req, res) => {
    try {
      const userId = req.userId; // Obtenemos el ID del usuario desde el token del middleware de autenticación
  
      // Buscamos y eliminamos todos los productos del carrito del usuario en la base de datos
      await Carrito.deleteMany({ user: userId });
  
      res.status(200).json({ message: 'Carrito vaciado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al vaciar el carrito' });
    }
  };


export {
    addItem,
    obtenerProductos,
    deleteProductos
}
