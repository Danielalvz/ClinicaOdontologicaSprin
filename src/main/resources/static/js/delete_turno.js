function deleteBy(id) {
    const url = '/turno/eliminar/' + id;
    const settings = {
        method: 'DELETE'
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.text(); // Leer como texto
            } else {
                throw new Error('Error al eliminar el turno');
            }
        })
        .then(data => {
            const row = document.getElementById('tr_' + id);
            if (row) {
                row.remove();

                showMessage(data, 'success');
            } else {
                throw new Error('Fila no encontrada en la tabla');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('No se pudo eliminar el turno', 'error');
        });
}

function showMessage(message, type) {
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.textContent = message;

    const container = document.querySelector('.container');
    container.insertBefore(div, container.firstChild);

    setTimeout(() => {
        div.remove();
    }, 3000);
}