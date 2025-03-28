const datos = [
    { id: 1, nombre: "Carlos", apellido: "López", correo: "carlos.lopez@example.com", telefono: "555-1234", comentario: "Cliente frecuente" },
    { id: 2, nombre: "Ana", apellido: "Martínez", correo: "ana.martinez@example.com", telefono: "555-5678", comentario: "Solicitó información sobre productos" },
    { id: 3, nombre: "Luis", apellido: "García", correo: "luis.garcia@example.com", telefono: "555-8765", comentario: "Requiere soporte técnico" },
    { id: 4, nombre: "María", apellido: "Hernández", correo: "maria.hernandez@example.com", telefono: "555-4321", comentario: "Interesada en promociones" },
    { id: 5, nombre: "Javier", apellido: "Pérez", correo: "javier.perez@example.com", telefono: "555-1111", comentario: "Dejó un comentario positivo" },
    { id: 6, nombre: "Sofía", apellido: "Díaz", correo: "sofia.diaz@example.com", telefono: "555-2222", comentario: "Quiere devolver un producto" },
    { id: 7, nombre: "Fernando", apellido: "Ruiz", correo: "fernando.ruiz@example.com", telefono: "555-3333", comentario: "Preguntó sobre envíos internacionales" },
    { id: 8, nombre: "Elena", apellido: "Gómez", correo: "elena.gomez@example.com", telefono: "555-4444", comentario: "Solicitó factura de su compra" },
    { id: 9, nombre: "Ricardo", apellido: "Torres", correo: "ricardo.torres@example.com", telefono: "555-5555", comentario: "Comentó sobre una demora en su pedido" },
    { id: 10, nombre: "Gabriela", apellido: "Mendoza", correo: "gabriela.mendoza@example.com", telefono: "555-6666", comentario: "Está interesada en un descuento" }
  ];
  
  tabla=document.querySelector("#tabla");

  function crearTabla(){
    var cadena = "<table>";
    cadena = cadena + "<thead>";
    cadena = cadena + "<tr>";
    cadena = cadena + "<th>ID</th>";
    cadena = cadena + "<th>Nombre</th>";
    cadena = cadena + "<th>Apellido</th>";
    cadena = cadena + "<th>Correo</th>";
    cadena = cadena + "<th>Telefono</th>";
    cadena = cadena + "<th>Comentario</th>";
    cadena = cadena + "</tr>";
    cadena = cadena + "</thead>";
    cadena = cadena + "<tbody>";
    for(const dato of datos){
      cadena = cadena + "<tr>";
      cadena = cadena + "<td>" + dato.id + "</td>";
      cadena = cadena + "<td>" + dato.nombre + "</td>";
      cadena = cadena + "<td>" + dato.apellido + "</td>";
      cadena = cadena + "<td>" + dato.correo + "</td>";
      cadena = cadena + "<td>" + dato.telefono + "</td>";
      cadena = cadena + "<td>" + dato.comentario + "</td>";
      cadena = cadena + "</tr>";
    }
    cadena=cadena+"</tbody>";
    cadena=cadena+"</table>";
    tabla.innerHTML=cadena;
  }

  crearTabla();

  function mostrarModal(){
    document.getElementById('contenedor-formulario').style.display = "flex";

  }

  function cerrarFormulario(){
    document.getElementById('contenedor-formulario').style.display = "none";
  }

  function agregarFila(){
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const comentario = document.getElementById("comentario").value;

    //Validamos que no haya campos vacios
    if(id && nombre && apellido && correo && telefono && comentario){
        //Crear una nueva fila en la tabla con los datos del formulario
       const body = tabla.getElementsByTagName("tbody")[0];
        const nuevaFila = body.insertRow();
        nuevaFila.innerHTML= `
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${correo}</td>
        <td>${telefono}</td>
        <td>${comentario}</td>
        `;
        document.getElementById("formulario").reset();

  } else{
    alert("Datos incompletos");
  }
  }

  

