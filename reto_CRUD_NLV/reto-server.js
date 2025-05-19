const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;
const options = {
    root: path.join(__dirname, "public")
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir archivos estáticos

// Configuración de MongoDB
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://nabilagunes:cukihelado2015@cluster0.n0tkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const cliente = new MongoClient(uri);
const dbName = 'DataBaseAutomoviles';
const collectionName = 'autos';


// Ruta home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Ruta para insertar automóvil
app.post('/insertar', async (req, res) => {
    try {
        const {id, marca, modelo, placa, color, anio} = req.body;
        await cliente.connect();
        const db = cliente.db(dbName);
        const coleccion = db.collection(collectionName);
        
        await coleccion.insertOne({
            id: id, 
            marca: marca, 
            modelo: modelo, 
            placa: placa, 
            color: color, 
            anio: anio
        });
        
        res.send(`
            <script>
            alert('Automóvil agregado exitosamente');
            window.location.href = '/home';
            </script>
        `);
    } catch (error) {
        res.status(500).send(`
            <script>
            alert('Error al agregar automóvil: ${error.message}');
            window.location.href = '/home';
            </script>
        `);
    } finally {
        await cliente.close();
    }
});

// Ruta para actualizar automóvil
app.post('/actualizar', async (req, res) => {
    try {
        const { id, color } = req.body;
        await cliente.connect();
        const db = cliente.db(dbName);
        const coleccion = db.collection(collectionName);

        const result = await coleccion.updateOne(
            { id: id },
            { $set: { color: color } }
        );

        if (result.matchedCount > 0) {
            res.send(`
                <script>
                alert('Automóvil actualizado exitosamente');
                window.location.href = '/home';
                </script>
            `);
        } else {
            res.send(`
                <script>
                alert('Automóvil no encontrado');
                window.location.href = '/home';
                </script>
            `);
        }
    } catch (error) {
        res.status(500).send(`
            <script>
            alert('Error al actualizar automóvil: ${error.message}');
            window.location.href = '/home';
            </script>
        `);
    } finally {
        await cliente.close();
    }
});

// Ruta para recuperar automóviles
app.post('/recuperar', async (req, res) => {
    try {
        await cliente.connect();
        const db = cliente.db(dbName);
        const coleccion = db.collection(collectionName);

        const documentos = await coleccion.find({}).toArray();
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await cliente.close();
    }
});

// Ruta para eliminar automóvil
app.post('/eliminar', async (req, res) => {
    try {
        const { id } = req.body;
        await cliente.connect();
        const db = cliente.db(dbName);
        const coleccion = db.collection(collectionName);

        const result = await coleccion.deleteOne({ id: id });

        if (result.deletedCount > 0) {
            res.send(`
                <script>
                alert('Automóvil eliminado exitosamente');
                window.location.href = '/home';
                </script>
            `);
        } else {
            res.send(`
                <script>
                alert('Automóvil no encontrado');
                window.location.href = '/home';
                </script>
            `);
        }
    } catch (error) {
        res.status(500).send(`
            <script>
            alert('Error al eliminar automóvil: ${error.message}');
            window.location.href = '/home';
            </script>
        `);
    } finally {
        await cliente.close();
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});