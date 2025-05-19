const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Habilitar el uso de JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
const uri = 'mongodb+srv://nabilagunes:cukihelado2015@cluster0.n0tkv.mongodb.net/DataBaseCanciones?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema de canción
const cancionSchema = new mongoose.Schema({
  cancion: { type: String, required: true },
  artista: { type: String, required: true },
  duracion: { type: String, required: true }
}, { 
  collection: 'cancions' // Asegura que use la colección correcta
});

// Crear el modelo
const Cancion = mongoose.model('Cancion', cancionSchema);

// Ruta GET para obtener todas las canciones
app.get('/canciones', async (req, res) => {
  try {
    const canciones = await Cancion.find();
    res.json(canciones);
  } catch (error) {
    console.error('Error al obtener canciones:', error);
    res.status(500).json({ mensaje: 'Error al obtener canciones' });
  }
});

// Ruta POST para agregar una nueva canción
app.post('/canciones', async (req, res) => {
  const { cancion, artista, duracion } = req.body;
  
  // Validar los datos recibidos
  if (!cancion || !artista || !duracion) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }
  
  try {
    // Crear una nueva canción
    const nuevaCancion = new Cancion({ cancion, artista, duracion });
    const cancionGuardada = await nuevaCancion.save();
    res.status(201).json(cancionGuardada);
  } catch (error) {
    console.error('Error al registrar canción:', error);
    res.status(500).json({ mensaje: 'Error al registrar canción' });
  }
});

// Ruta PUT para actualizar una canción existente
app.put('/canciones/:id', async (req, res) => {
  const { id } = req.params;
  const { cancion, artista, duracion } = req.body;
  
  try {
    const cancionActualizada = await Cancion.findByIdAndUpdate(
      id, 
      { cancion, artista, duracion },
      { new: true }
    );
    
    if (!cancionActualizada) {
      return res.status(404).json({ mensaje: 'Canción no encontrada' });
    }
    
    res.json(cancionActualizada);
  } catch (error) {
    console.error('Error al actualizar canción:', error);
    res.status(500).json({ mensaje: 'Error al actualizar canción' });
  }
});

// Ruta DELETE para eliminar una canción
app.delete('/canciones/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const cancionEliminada = await Cancion.findByIdAndDelete(id);
    
    if (!cancionEliminada) {
      return res.status(404).json({ mensaje: 'Canción no encontrada' });
    }
    
    res.json({ mensaje: 'Canción eliminada exitosamente', cancion: cancionEliminada });
  } catch (error) {
    console.error('Error al eliminar canción:', error);
    res.status(500).json({ mensaje: 'Error al eliminar canción' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});