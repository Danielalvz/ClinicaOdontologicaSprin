function deleteBy(id)
{
          //con fetch invocamos a la API de peliculas con el método DELETE
          //pasandole el id en la URL
          const url = '/turno/'+ id;
          const settings = {
              method: 'DELETE'
          }
          fetch(url,settings)
          .then(response => response.json())

          //borrar la fila de la pelicula eliminada
          let row_id = id;
          document.querySelector(row_id).remove();

}