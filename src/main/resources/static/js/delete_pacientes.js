function deleteBy(id) {
    const url = '/paciente/eliminar/' + id;
    const settings = {
        method: 'DELETE'
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.text(); // Leer como texto
            } else {
                throw new Error('Error al eliminar el paciente');
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
            showMessage('No se pudo eliminar el paciente', 'error');
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


//function deleteBy(id)
//{
//          //con fetch invocamos a la API de peliculas con el método DELETE
//          //pasandole el id en la URL
//          const url = '/paciente/eliminar/'+ id;
//          const settings = {
//              method: 'DELETE'
//          }
//          fetch(url,settings)
//          .then(response => response.json())
//
//          //borrar la fila de la pelicula eliminada
//          let row_id = "#tr_" + id;
//          document.querySelector(row_id).remove();
//
//}