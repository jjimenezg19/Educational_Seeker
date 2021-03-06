'use strict';

const tabla = document.querySelector('#tabla_padres_registrados tbody');
const input_filtrar = document.querySelector('#txt_filtrar');



let irAlPerfil = (pId) => {
    localStorage.setItem('idBuscarPadre', pId);
    window.location.replace("principal_padres_desde_centros.html");
};


let padresFamilia = listar_padres();



let mostrar_datos = () => {
    let filtros = input_filtrar.value;
    tabla.innerHTML = '';
    for (let i = 0; i < padresFamilia.length; i++) {

        if (padresFamilia[i]['nombre'].toLowerCase().includes(filtros.toLowerCase()) 
            ||padresFamilia[i]['apellido'].toLowerCase().includes(filtros.toLowerCase())) {

            let fila = tabla.insertRow();

            fila.insertCell().innerHTML = padresFamilia[i]['nombre'];
            fila.insertCell().innerHTML = padresFamilia[i]['apellido'];
            fila.insertCell().innerHTML = padresFamilia[i]['segundoApellido'];
            fila.insertCell().innerHTML = padresFamilia[i]['correo'];

             
            let provincia = obtenerProvinciaPorID(parseInt(padresFamilia[i]['provincia'], 10));
            fila.insertCell().innerHTML = provincia;
            fila.insertCell().innerHTML = '<a href="#" class="ver" onClick="irAlPerfil('+padresFamilia[i]['_id']+'); return false;"><i class="fas  fa-eye"></i></button>';
        }
    }
};

input_filtrar.addEventListener('keyup', mostrar_datos);
    mostrar_datos();