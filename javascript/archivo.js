//MODULOS

function sayHello(nombre) {
    return `Hola ${nombre}`;
}

function sayHelloWorld() {
    return "Hola Mundo";
}



//Importacion - Exportacion de modulos

//module.exports.sayHello = sayHello;
//module.exports.sayHelloWorld = sayHelloWorld;

module.exports = {
    sayHello: sayHello,
    sayHelloWorld: sayHelloWorld
};
