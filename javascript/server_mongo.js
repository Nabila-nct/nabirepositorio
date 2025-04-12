const express = require('express'); 
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); //para peticiones de frontend
app.use(express.urlencoded({extended: true})); //para recibir datos de formularios
app.use(express.json()); //para recibir datos en formato json

//traernos la cadena de conexion de mongodb
const {MongoClient, ServerApiVersion} = require('mongodb');

const uri='mongodb+srv://nabilagunes:cukihelado15@cluster0.n0tkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const cliente=new MongoClient(uri, {
    serverApi: {
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
});

async function run(){
    try{
        await cliente.connect();
        await cliente.db("admin").command({ping:1});
        console.log("Conexion exitosa");
    }finally{
        await cliente.close();
    }
}

app.get('/',async(req,res)=>{
    await cliente.connect();
    const db= cliente.db("sample_mflix");
    const collection=db.collection("movies");
    const resultado = await collection.find({poster:{$ne:null}},
        {_id:0,title:1,poster:1,plot:1}).toArray();
        
    res.json(resultado);
});

//npm install cors
app.listen(port,async () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    await run();
});