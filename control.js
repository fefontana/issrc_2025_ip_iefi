/*
PROFESOR
ESTUDIANTE
CONSIGNA
Simulador de Cajero Automático

Formato de entrega: Video grabado y entregado en formato digital (Google
Drive, WeTransfer o similar)

Desarrollar un programa funcional que simule el comportamiento de un cajero automático.

Además, deberán grabar un video grupal de entre 10 y 15 minutos, en el que 
expliquen de forma clara y ordenada el desarrollo de su código,
deteniéndose especialmente en las partes más críticas

*/

let cajero = null;

let estadoCajero = 'inicial';

// Carga dinámica del script cajero.js
function cargarScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
        console.log(`Script ${src} cargado ok.`);
        if (callback) callback();
    };
    script.onerror = () => console.error(`Error al cargar ${src}`);
    document.head.appendChild(script);
}


document.addEventListener('DOMContentLoaded', () => {
	
	actualizarUI();
	
	// Evento para "crear" (carga crear.js)
	document.getElementById('crear').addEventListener('click', () => {

		//console.log("Creando maquina...");

	    cargarScript('model.js', () => {

			if (cajero) {
			  console.log("❌ Ya existe un cajero.");
			  const r = prompt("Reemplazar cajero? Y/N");
			  if (r !== 'Y' && r !== 'y') {
			    console.log("❌ Operación cancelada.");
			    return;
			  }
			}

			// Crear y configurar cajero
			cajero = model();
			console.log("✅ Cajero creado.");
			document.getElementById('operacion').hidden = false; // mostrar
			document.getElementById('function').innerText = ">_";

			const billetes = [500, 1000, 2000, 10000, 20000];
			cajero.configurar(billetes);

			console.log("Configuración de billetes: " + billetes);
			// console.log(`Dinero cargado: $${cajero.verificarDisponibilidadSaldo()}`);
			// cajero.showCaja();

	    document.getElementById('valor').value = ''; // Resetea el valor del input
    	document.getElementById('ticket').value= ''; // Resetea el valor del textarea
    	cambiarEstado('creado');

	    });
	    
	});
	document.getElementById('status').addEventListener('click', () => {

	        console.log(cajero.status()); //
	        console.log(cajero.showCaja());
	});
	document.getElementById('cargar').addEventListener('click', () => {
    		
    		const montos = [90, 90, 90, 90, 90]; 
    		cajero.cargar(montos);
    		cajero.showCaja();
    		cambiarEstado('cargado');

	});
	document.getElementById('start').addEventListener('click', () => {

	        console.log(cajero.start()); // 
	        // document.getElementById('function').value= "ON";
	        // funciona solamente si el elemento con id="function" es un <input> o un <textarea>, 
	        // es decir, un elemento de formulario que tenga una propiedad .value
	        document.getElementById('function').innerText = "ON";
	        // funciona solamente si el elemento con id="function" es un <input> o un <textarea>, 
	        // es decir, un elemento de formulario que tenga una propiedad .value
	        cambiarEstado('encendido');
	});
	document.getElementById('stop').addEventListener('click', () => {

	        console.log(cajero.stop()); // 
	        document.getElementById('function').innerText= "OFF";
	        cambiarEstado('apagado');
	});
	document.getElementById('saldo').addEventListener('click', () => {

	        const input = document.getElementById('valor');
	        const ticket = document.getElementById('ticket');

	        var contenido= cajero.verificarDisponibilidadSaldo();
	    	var date= new Date();
	    	
  	  		ticket.value= ">_Ticket\n\nConsulta saldo"+ "\nSaldo: $"+ contenido + "\nFecha/Hora: " + date.toString();
	        console.log(ticket.value); // 
	      	input.value = '';
	});
	document.getElementById('extraer').addEventListener('click', () => {
		    
		    const input = document.getElementById('valor');
		    const ticket = document.getElementById('ticket');
		    const contenido = input.value;
		    
		    console.log("Contenido del input:", contenido);
				var exito = cajero.retirar(contenido);
	      if(exito){
	    		var date= new Date();
  	  		ticket.value= ">_Ticket\n\nNro extraccion: "+ cajero.showNroExtraccion() +"\nMonto: $"+ contenido +"\nSaldo: $"+ cajero.verificarDisponibilidadSaldo() + "\nFecha/Hora: " + date.toString();
	      	input.value = ''; // Resetea el valor del input
	      }
	      else {
    			input.value = ''; // Resetea el valor del input
    			ticket.value= "";
	      }


	});

});

function cambiarEstado(nuevoEstado) {
  estadoCajero = nuevoEstado;
  actualizarUI();
}

