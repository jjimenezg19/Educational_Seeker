'usea strict';


//función para registrar los datos con su respectiva ruta
let registrar_servicio = (pnombre, ptipo, pdescripcion, pEnviaResultado) => {

    //NOTA: pEnviaResultado es una función que viene como parámetro para enviar el resultado al controlador.
    // La función pEnviaResultado recibe sus propios parámetros (en el controlador): success, msg.
  
    let request = $.ajax({
      url: "https://educational-seeker.herokuapp.com/api/registrar_servicio",
      method: "POST",
      data: {
        codigo : localStorage.getItem('id'),
        nombre: pnombre,
        tipo: ptipo,
        descripcion: pdescripcion
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  
    request.done(function (res) {
  
      //Enviamos los resultados que el api retornó, al controlador:
      //Ejecutamos la función pEnviaResultado y le enviamos los propios parámetros:
      pEnviaResultado(res.success, res.msg);
  
    });
  
    request.fail(function (jqXHR, textStatus) {
      pEnviaResultado(false, 'Ocurrió un error inesperado, por favor intente de nuevo');
    });
  };

  //para obtener los servicios por el id del centro 
  let obtener_servicios_por_id = (id_centro) => {
    let coleccion = [];

    let request = $.ajax({
      url: "https://educational-seeker.herokuapp.com/api/obtener_servicios_id/" + id_centro,
      type: "GET",
      data: {
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async: false
    });

    request.done(function (res) {
      if(res.success){
        coleccion = res.message;
      }else{
        console.log(res.message);
      }
    });
    
    request.fail(function (jqXHR, textStatus) {
  
    });
    return coleccion;
  };

//para obtener el nombre del centro educativo
  let obtener_nombre_centro_id = (id_centro) => {
    let nombre;
    
    let request = $.ajax({
      url: "https://educational-seeker.herokuapp.com/api/obtener_nombre_centro_id/" + id_centro,
      type: "GET",
      data: {
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async: false
    });
  
    request.done(function (res) {
      nombre = res.nombre_centro;
    
    });
    
    request.fail(function (jqXHR, textStatus) {
  
    });
    return nombre;
  };

  //para modificar el servicio 
  let modificar_servicio = (id_servicio, pnombre, pdescripcion)=>{

    let request = $.ajax({
      url: "https://educational-seeker.herokuapp.com/api/modificar_servicios" ,
      type: "POST",
      data: {
        id_servicio : id_servicio,
        nombre : pnombre,
        descripcion : pdescripcion
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    request.done(function (res) {
      swal.fire({
        type: 'success',
        title: 'El servicio fue actualizado de forma exitosa'
        
      }).then((result) => {
        if (result.value) {

      }
      });
    });

    request.fail(function (jqXHR, textStatus) {
      swal.fire({
        type: 'error',
        title: 'El servicio no fue actualizado',
        text: 'Ocurrió un error inesperado, por favor intente de nuevo'
      });
    });
  };

//función para eliminar servico 
let  eliminar_servicio = (codigo) => {
  let request = $.ajax({
    url: "https://educational-seeker.herokuapp.com/api/eliminar_servicios/"+codigo ,
    type: "GET",
    data: {
    },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    async: false
  });

  request.done(function (res) {
    swal.fire({
      type: 'success',
      title: 'El servicio fue eliminado de forma exitosa'
    }).then((result) => {
      if (result.value) {
    }
})
  });

  request.fail(function (jqXHR, textStatus) {

  });

};