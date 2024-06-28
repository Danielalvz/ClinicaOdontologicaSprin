window.addEventListener('load', function () {
    const formulario = document.querySelector('#add_new_turno');

    cargarPacientes();
    cargarOdontologos();

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            paciente: { id: document.querySelector('#paciente').value },
            odontologo: { id: document.querySelector('#odontologo').value },
            fecha: document.querySelector('#fecha').value
        };

        const url = '/turno';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        };

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => { throw new Error(err.message); });
                }
            })
            .then(data => {
                let successAlert = '<div class="alert alert-success alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>Turno Guardado</strong></div>';

                document.querySelector('#response').innerHTML = successAlert;
                document.querySelector('#response').style.display = "block";
                resetUploadForm();
            })
            .catch(error => {
                let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>Error al guardar el turno. Intente nuevamente.</strong></div>';

                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";
                console.error('Error al guardar el turno:', error);  // Imprimir el error en la consola
                resetUploadForm();
            });
    });

    function resetUploadForm() {
        document.querySelector('#paciente').value = "";
        document.querySelector('#odontologo').value = "";
        document.querySelector('#fecha').value = "";
    }

    function cargarPacientes() {
        const url = '/paciente';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los pacientes.');
                }
                return response.json();
            })
            .then(data => {
                const selectPaciente = document.querySelector('#paciente');
                selectPaciente.innerHTML = '';

                data.forEach(paciente => {
                    const option = document.createElement('option');
                    option.value = paciente.id;
                    option.textContent = `${paciente.nombre}  ${paciente.apellido}`;
                    selectPaciente.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar los pacientes:', error);
            });
    }

    function cargarOdontologos() {
        const url = '/odontologo';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los odontólogos.');
                }
                return response.json();
            })
            .then(data => {
                const selectOdontologo = document.querySelector('#odontologo');
                selectOdontologo.innerHTML = '';

                data.forEach(odontologo => {
                    const option = document.createElement('option');
                    option.value = odontologo.id;
                    option.textContent = `${odontologo.nombre}  ${odontologo.apellido}`;
                    selectOdontologo.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar los odontólogos:', error);
            });
    }
});


//window.addEventListener('load', function () {
//    const formulario = document.querySelector('#add_new_turno');
//
//    // Cargar pacientes y odontólogos disponibles
//    cargarPacientes();
//    cargarOdontologos();
//
//    formulario.addEventListener('submit', function (event) {
//        event.preventDefault();
//
//        const formData = {
//            pacienteId: document.querySelector('#paciente').value,
//            odontologoId: document.querySelector('#odontologo').value,
//            fecha: document.querySelector('#fecha').value
//        };
//
//        const url = '/turno';
//        const settings = {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(formData)
//        };
//
//        fetch(url, settings)
//            .then(response => {
//                if (response.ok) {
//                    return response.json();
//                } else {
//                    throw new Error('Error en la solicitud.');
//                }
//            })
//            .then(data => {
//                let successAlert = '<div class="alert alert-success alert-dismissible">' +
//                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
//                    '<strong>Turno Guardado</strong></div>';
//
//                document.querySelector('#response').innerHTML = successAlert;
//                document.querySelector('#response').style.display = "block";
//                resetUploadForm();
//            })
//            .catch(error => {
//                let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
//                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
//                    '<strong>Error al guardar el turno. Intente nuevamente.</strong></div>';
//
//                document.querySelector('#response').innerHTML = errorAlert;
//                document.querySelector('#response').style.display = "block";
//                resetUploadForm();
//            });
//    });
//
//    function resetUploadForm() {
//        document.querySelector('#paciente').value = "";
//        document.querySelector('#odontologo').value = "";
//        document.querySelector('#fecha').value = "";
//    }
//
//    function cargarPacientes() {
//        const url = '/paciente';
//
//        fetch(url)
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Error al cargar los pacientes.');
//                }
//                return response.json();
//            })
//            .then(data => {
//                const selectPaciente = document.querySelector('#paciente');
//                selectPaciente.innerHTML = '';
//
//                data.forEach(paciente => {
//                    const option = document.createElement('option');
//                    option.value = paciente.id;
//                    option.textContent = `${paciente.nombre} ${paciente.apellido}`;
//                    selectPaciente.appendChild(option);
//                });
//            })
//            .catch(error => {
//                console.error('Error al cargar los pacientes:', error);
//            });
//    }
//
//    function cargarOdontologos() {
//        const url = '/odontologo';
//
//        fetch(url)
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Error al cargar los odontólogos.');
//                }
//                return response.json();
//            })
//            .then(data => {
//                const selectOdontologo = document.querySelector('#odontologo');
//                selectOdontologo.innerHTML = '';
//
//                data.forEach(odontologo => {
//                    const option = document.createElement('option');
//                    option.value = odontologo.id;
//                    option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
//                    selectOdontologo.appendChild(option);
//                });
//            })
//            .catch(error => {
//                console.error('Error al cargar los odontólogos:', error);
//            });
//    }
//});
