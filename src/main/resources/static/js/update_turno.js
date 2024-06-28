window.addEventListener('load', function () {
    const formulario = document.querySelector('#update_turno_form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        let turnoId = document.querySelector('#turno_id').value;

        const formData = {
            id: turnoId,
            paciente: { id: document.querySelector('#paciente').value },
            odontologo: { id: document.querySelector('#odontologo').value },
            fecha: document.querySelector('#fecha').value
        };

        const url = '/turno';
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        };

        fetch(url, settings)
            .then(response => {
                // Verificar el código de estado HTTP
                if (response.ok || response.status === 204) {
                    let successAlert = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                        '<strong>Paciente Actualizado!</strong> La información del turno ha sido actualizada correctamente.' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>';

                    document.querySelector('#response').innerHTML = successAlert;
                    document.querySelector('#response').style.display = "block";

                    setTimeout(() => {
                        document.querySelector('#response').style.display = "none";
                    }, 3000);
                } else {
                    throw new Error('Error en la actualización');
                }
            })
            .catch(error => {
                // Mostrar alerta de error
                let errorAlert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                    '<strong>Error!</strong> No se pudo actualizar el turno. Intente nuevamente.' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>';

                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";

                setTimeout(() => {
                    document.querySelector('#response').style.display = "none";
                }, 3000);
            });
    });
});

function findBy(id) {
    const url = '/turno/' + id;
    const settings = {
        method: 'GET'
    };
    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            let turno = data;
            document.querySelector('#turno_id').value = turno.id;
            document.querySelector('#paciente').value = turno.paciente.nombre + ' ' + turno.paciente.apellido;
            document.querySelector('#odontologo').value = turno.odontologo.nombre + ' ' + turno.odontologo.apellido;
            document.querySelector('#fecha').value = turno.fecha;
            document.querySelector('#div_turno_updating').style.display = "block";
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

//window.addEventListener('load', function () {
//
//
//    //Buscamos y obtenemos el formulario donde estan
//    //los datos que el usuario pudo haber modificado de la pelicula
//    const formulario = document.querySelector('#update_turno_form');
//
//    formulario.addEventListener('submit', function (event) {
//        let turnoId = document.querySelector('#turno_id').value;
//
//        //creamos un JSON que tendrá los datos de la película
//        //a diferencia de una pelicula nueva en este caso enviamos el id
//        //para poder identificarla y modificarla para no cargarla como nueva
//        const formData = {
//            id: document.querySelector('#turno_id').value,
//            paciente: document.querySelector('#paciente').value,
//            odontologo: document.querySelector('#odontologo').value,
//            fecha: document.querySelector('#fecha').value,
//
//        };
//
//        //invocamos utilizando la función fetch la API peliculas con el método PUT que modificará
//        //la película que enviaremos en formato JSON
//        const url = '/turno';
//        const settings = {
//            method: 'PUT',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(formData)
//        }
//          fetch(url,settings)
//          .then(response => response.json())
//
//    })
// })
//
//    //Es la funcion que se invoca cuando se hace click sobre el id de una pelicula del listado
//    //se encarga de llenar el formulario con los datos de la pelicula
//    //que se desea modificar
//    function findBy(id) {
//          const url = '/turno'+"/"+id;
//          const settings = {
//              method: 'GET'
//          }
//          fetch(url,settings)
//          .then(response => response.json())
//          .then(data => {
//              let turno = data;
//              document.querySelector('#turno_id').value = turno.id;
//              document.querySelector('#paciente').value = turno.paciente.nombre + turno.paciente.apellido;
//              document.querySelector('#odontologo').value = turno.odontologo.nombre + turno.odontologo.apellido;
//              document.querySelector('#fecha').value = turno.fecha;
//              //el formulario por default esta oculto y al editar se habilita
//              document.querySelector('#div_turno_updating').style.display = "block";
//          }).catch(error => {
//              alert("Error: " + error);
//          })
//      }
//// Función para cargar los datos del turno en el formulario de actualización
//function findBy(id) {
//    const url = `/turno/${id}`;
//    const settings = {
//        method: 'GET'
//    };
//
//    fetch(url, settings)
//        .then(response => response.json())
//        .then(data => {
//            // Mostrar el formulario de actualización
//            document.getElementById('div_turno_updating').style.display = 'block';
//
//            // Llenar el formulario con los datos del turno
//            if (document.getElementById('turno_id')) {
//                document.getElementById('turno_id').value = data.id;
//            }
//            if (document.getElementById('paciente')) {
//                document.getElementById('paciente').value = data.paciente.nombre + ' ' + data.paciente.apellido;
//            }
//            if (document.getElementById('odontologo')) {
//                document.getElementById('odontologo').value = data.odontologo.nombre + ' ' + data.odontologo.apellido;
//            }
//            if (document.getElementById('fecha')) {
//                document.getElementById('fecha').value = data.fecha;
//            }
//        })
//        .catch(error => {
//            console.error('Error al cargar el turno:', error);
//        });
//}
//
//// Función para enviar la solicitud de actualización al servidor
//function updateTurno() {
//    const turnoId = document.getElementById('turno_id').value;
//
//    // Asegúrate de que el id del turno existe antes de intentar actualizar
//    if (!turnoId) {
//        console.error('Error: El ID del turno no está definido.');
//        return;
//    }
//
//    const url = `/turno`;  // No incluimos el ID en la URL
//    const data = {
//        id: turnoId,
//        paciente: {
//            nombre: document.getElementById('paciente').value.split(' ')[0],
//            apellido: document.getElementById('paciente').value.split(' ')[1]
//            // El email no se incluye en la actualización
//        },
//        odontologo: {
//            nombre: document.getElementById('odontologo').value.split(' ')[0],
//            apellido: document.getElementById('odontologo').value.split(' ')[1]
//        },
//        fecha: document.getElementById('fecha').value
//    };
//
//    const settings = {
//        method: 'PUT',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(data)
//    };
//
//    fetch(url, settings)
//        .then(response => {
//            console.log('Respuesta del servidor:', response);
//            if (!response.ok) {
//                throw new Error(`HTTP error! status: ${response.status}`);
//            }
//            return response.text();  // La respuesta es un mensaje simple
//        })
//        .then(message => {
//            console.log(`Respuesta del servidor: ${message}`);
//            if (message === "Turno actualizado") {
//                // Actualiza la fila de la tabla con los datos modificados
//                const row = document.getElementById(`tr_${turnoId}`);
//                if (row) {
//                    row.querySelector('.td_paciente').innerText = data.paciente.nombre + ' ' + data.paciente.apellido;
//                    row.querySelector('.td_odontologo').innerText = data.odontologo.nombre + ' ' + data.odontologo.apellido;
//                    row.querySelector('.td_fecha').innerText = data.fecha;
//                }
//            } else {
//                console.error(`Error al actualizar el turno: ${message}`);
//            }
//        })
//        .catch(error => {
//            console.error('Error al actualizar el turno:', error);
//        });
//}
//
//
//// Añadir un listener para el formulario de actualización
//document.getElementById('update_turno_form').addEventListener('submit', updateTurno);
