window.addEventListener('load', function () {
    const formulario = document.querySelector('#update_paciente_form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        let pacienteId = document.querySelector('#paciente_id').value;

        const formData = {
            id: pacienteId,
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            cedula: document.querySelector('#cedula').value,
            fechaIngreso: document.querySelector('#fechaIngreso').value,
            domicilio: {
                calle: document.querySelector('#calle').value
            },
            email: document.querySelector('#email').value,
        };

        const url = '/paciente';
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
                        '<strong>Paciente Actualizado!</strong> La información del paciente ha sido actualizada correctamente.' +
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
                    '<strong>Error!</strong> No se pudo actualizar el paciente. Intente nuevamente.' +
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
    const url = '/paciente/' + id;
    const settings = {
        method: 'GET'
    };
    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            let paciente = data;
            document.querySelector('#paciente_id').value = paciente.id;
            document.querySelector('#nombre').value = paciente.nombre;
            document.querySelector('#apellido').value = paciente.apellido;
            document.querySelector('#cedula').value = paciente.cedula;
            document.querySelector('#fechaIngreso').value = paciente.fechaIngreso;
            document.querySelector('#calle').value = paciente.domicilio.calle;
            document.querySelector('#email').value = paciente.email;
            document.querySelector('#div_paciente_updating').style.display = "block";
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
//    const formulario = document.querySelector('#update_paciente_form');
//
//    formulario.addEventListener('submit', function (event) {
//        event.preventDefault();
//        let pacienteId = document.querySelector('#paciente_id').value;
//
//        const formData = {
//            id: document.querySelector('#paciente_id').value,
//            nombre: document.querySelector('#nombre').value,
//            apellido: document.querySelector('#apellido').value,
//            cedula: document.querySelector('#cedula').value,
//            fechaIngreso: document.querySelector('#fechaIngreso').value,
//            domicilio:{
//                calle:document.querySelector('#calle').value
//            },
//            email: document.querySelector('#email').value,
//
//        };
//
//        const url = '/paciente';
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
//          const url = '/paciente'+"/"+id;
//          const settings = {
//              method: 'GET'
//          }
//          fetch(url,settings)
//          .then(response => response.json())
//          .then(data => {
//              let paciente = data;
//              document.querySelector('#paciente_id').value = paciente.id;
//              document.querySelector('#nombre').value = paciente.nombre;
//              document.querySelector('#apellido').value = paciente.apellido;
//              document.querySelector('#cedula').value = paciente.cedula;
//              document.querySelector('#fechaIngreso').value = paciente.fechaIngreso;
//              document.querySelector('#calle').value = paciente.domicilio.calle;
//              document.querySelector('#email').value = paciente.email;
//              //el formulario por default esta oculto y al editar se habilita
//              document.querySelector('#div_paciente_updating').style.display = "block";
//          }).catch(error => {
//              alert("Error: " + error);
//          })
//      }

//      window.addEventListener('load', function () {
      //
      //
      //    //Buscamos y obtenemos el formulario donde estan
      //    //los datos que el usuario pudo haber modificado de la pelicula
      //    const formulario = document.querySelector('#update_paciente_form');
      //
      //    formulario.addEventListener('submit', function (event) {
      //        event.preventDefault();
      //        let pacienteId = document.querySelector('#paciente_id').value;
      //
      //        const formData = {
      //            id: document.querySelector('#paciente_id').value,
      //            nombre: document.querySelector('#nombre').value,
      //            apellido: document.querySelector('#apellido').value,
      //            cedula: document.querySelector('#cedula').value,
      //            fechaIngreso: document.querySelector('#fechaIngreso').value,
      //            domicilio:{
      //                calle:document.querySelector('#calle').value,
      //            },
      //            email: document.querySelector('#email').value,
      //
      //        };
      //
      //        const url = '/paciente/' + pacienteId;
      //        const settings = {
      //            method: 'PUT',
      //            headers: {
      //                'Content-Type': 'application/json',
      //            },
      //            body: JSON.stringify(formData)
      //        };
      //
      //          fetch(url, settings)
      //              .then(response => {
      //                  if (!response.ok) {
      //                      throw new Error('Error en la solicitud de actualización');
      //                  }
      //                  return response.json();
      //              })
      //              .then(data => {
      //                  // Aquí puedes actualizar la fila de la tabla con los nuevos datos del paciente
      //                  console.log("Paciente actualizado:", data);
      //                  // Llamar a una función para actualizar la fila de la tabla
      //                  actualizarFilaPaciente(data);
      //              })
      //              .catch(error => {
      //                  console.error('Error al actualizar el paciente:', error);
      //                  alert("Error al actualizar el paciente. Intente nuevamente.");
      //              });
      //
      //    })
      // })
      //
      //    //Es la funcion que se invoca cuando se hace click sobre el id de una pelicula del listado
      //    //se encarga de llenar el formulario con los datos de la pelicula
      //    //que se desea modificar
      //    function findBy(id) {
      //          const url = '/paciente/' + id;
      //              const settings = {
      //                  method: 'GET'
      //              }
      //              fetch(url, settings)
      //                  .then(response => {
      //                      if (!response.ok) {
      //                          throw new Error('Error al obtener el paciente');
      //                      }
      //                      return response.json();
      //                  })
      //                  .then(data => {
      //                      let paciente = data;
      //                      document.querySelector('#paciente_id').value = paciente.id;
      //                      document.querySelector('#nombre').value = paciente.nombre;
      //                      document.querySelector('#apellido').value = paciente.apellido;
      //                      document.querySelector('#cedula').value = paciente.cedula;
      //                      document.querySelector('#fechaIngreso').value = paciente.fechaIngreso;
      //                      document.querySelector('#calle').value = paciente.domicilio.calle;
      //                      document.querySelector('#email').value = paciente.email;
      //                      // Mostrar el formulario de actualización
      //                      document.querySelector('#div_paciente_updating').style.display = "block";
      //                  })
      //                  .catch(error => {
      //                      console.error('Error al obtener el paciente:', error);
      //                      alert("Error al obtener el paciente.");
      //                  });
      //      }