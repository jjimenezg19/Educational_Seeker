'use strict';

/**
 * pCallback es la función que está en el controlador (controlador_listar_cedu.js) y ejecta listarCEdu.
 * pCallback recibe como parámetros a: pSuccess y pMessage y se le envían desde aquí.
 * @param  {Function} pCallback
 */
let listarCEdu = (pCallback) => {
    let request = $.ajax({
        url: 'https://educational-seeker.herokuapp.com/api/obtener_todos_centro_educativo',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        cache: false
    }).done((respuesta) => {

        //Verificamos que pCallback sea una función
        if ('function' == typeof (pCallback)) {

            //Verificamos que respuesta sea un JSON
            if ('object' == typeof (respuesta)) {

                //Ejecutamos la función pCallback
                pCallback(respuesta.success, respuesta.message);
            } else {

                //Ejecutamos la función pCallback
                pCallback(false, respuesta);

            }
        } else {
            throw new Error('Se esperaba una función');
        }
    }).fail((jqXHR, textStatus) => {

        const elError = 'Error listarCEdu: ' + jqXHR.statusText + ' [' + jqXHR.status + ']  -  ' + jqXHR.responseText;

        throw new Error(elError);
    });
};


let listarCEdu_sin_aprobar = (pCallback) => {
    let request = $.ajax({
        url: 'https://educational-seeker.herokuapp.com/api/obtener_centros_educativos_sin_aprobar',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        cache: false
    }).done((respuesta) => {

        //Verificamos que pCallback sea una función
        if ('function' == typeof (pCallback)) {

            //Verificamos que respuesta sea un JSON
            if ('object' == typeof (respuesta)) {

                //Ejecutamos la función pCallback
                pCallback(respuesta.success, respuesta.message);
            } else {

                //Ejecutamos la función pCallback
                pCallback(false, respuesta);

            }
        } else {
            throw new Error('Se esperaba una función');
        }
    }).fail((jqXHR, textStatus) => {

        const elError = 'Error listarCEdu: ' + jqXHR.statusText + ' [' + jqXHR.status + ']  -  ' + jqXHR.responseText;

        throw new Error(elError);
    });
};

