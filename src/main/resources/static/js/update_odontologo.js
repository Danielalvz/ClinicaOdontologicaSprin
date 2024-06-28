window.addEventListener('load', function () {
    const formulario = document.querySelector('#update_odontologo_form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        let odontologoId = document.querySelector('#odontologo_id').value;

        const formData = {
            id: odontologoId,
            matricula: document.querySelector('#matricula').value,
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value
        };

        const url = '/odontologo';
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
                        '<strong>Odontologo Actualizado!</strong> La información del odontologo ha sido actualizada correctamente.' +
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
                    '<strong>Error!</strong> No se pudo actualizar el odontologo. Intente nuevamente.' +
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
    const url = '/odontologo/' + id;
    const settings = {
        method: 'GET'
    };
    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            let odontologo = data;
            document.querySelector('#odontologo_id').value = odontologo.id;
            document.querySelector('#matricula').value = odontologo.matricula;
            document.querySelector('#nombre').value = odontologo.nombre;
            document.querySelector('#apellido').value = odontologo.apellido;
            document.querySelector('#div_odontologo_updating').style.display = "block";
        })
        .catch(error => {
            alert("Error: " + error);
        });
}


//window.addEventListener('load', function () {
//
//    const formulario = document.querySelector('#update_odontologo_form');
//
//    formulario.addEventListener('submit', function (event) {
//        let odontologoId = document.querySelector('#odontologo_id').value;
//
//        //creamos un JSON que tendrá los datos de la película
//        //a diferencia de una pelicula nueva en este caso enviamos el id
//        //para poder identificarla y modificarla para no cargarla como nueva
//        const formData = {
//            id: document.querySelector('#odontologo_id').value,
//            matricula: document.querySelector('#matricula').value,
//            nombre: document.querySelector('#nombre').value,
//            apellido: document.querySelector('#apellido').value,
//
//        };
//
//        //invocamos utilizando la función fetch la API peliculas con el método PUT que modificará
//        //la película que enviaremos en formato JSON
//        const url = '/odontologo';
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
//          const url = '/odontologo'+"/"+id;
//          const settings = {
//              method: 'GET'
//          }
//          fetch(url,settings)
//          .then(response => response.json())
//          .then(data => {
//              let odontologo = data;
//              document.querySelector('#pelicula_id').value = odontologo.id;
//              document.querySelector('#matricula').value = odontologo.matricula;
//              document.querySelector('#nombre').value = odontologo.nombre;
//              document.querySelector('#apellido').value = odontologo.apellido;
//              //el formulario por default esta oculto y al editar se habilita
//              document.querySelector('#div_odontologo_updating').style.display = "block";
//          }).catch(error => {
//              alert("Error: " + error);
//          })
//      }