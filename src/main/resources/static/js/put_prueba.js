window.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('#add_new_turno');

    cargarPacientes();
    cargarOdontologos();

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            paciente: { id: document.querySelector('#pacienteSelect').value },
            odontologo: { id: document.querySelector('#odontologoSelect').value },
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
                const selectPaciente = document.querySelector('#pacienteSelect');
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
                const selectOdontologo = document.querySelector('#odontologoSelect');
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
                        document.querySelector('#pacienteSelect').value = turno.paciente.id; // Usar el ID del paciente
                        document.querySelector('#odontologoSelect').value = turno.odontologo.id; // Usar el ID del odontólogo
                        document.querySelector('#fecha').value = turno.fecha;
                        document.querySelector('#div_turno_updating').style.display = "block";
        })
        .catch(error => {
            alert("Error: " + error);
        });
}