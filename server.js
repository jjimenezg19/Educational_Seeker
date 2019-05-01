
'use strict';

const express = require("express"),
      path = require("path"),
      bodyParser = require("body-parser"),
      mongodb = require("mongodb"),
      mongoose = require('mongoose'),
      app = express();

//const http = require('http');

 //Se declaran todos los accesos de las rutas
 
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Permite que el req.body se lea como llave:valor
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongoose.connect('mongodb://jams:'+encodeURIComponent('proyecto06')+'@clusterjams-shard-00-00-bwmen.mongodb.net:27017,clusterjams-shard-00-01-bwmen.mongodb.net:27017,clusterjams-shard-00-02-bwmen.mongodb.net:27017/MEP?ssl=true&replicaSet=clusterJAMS-shard-0&authSource=admin&retryWrites=true', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.

  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


// Conexion a todas la rutas
const CompBitacora = require('./api/componentes/bitacora_transaccional/bitacora.route');
app.use('/api', CompBitacora);

const CompNivelesCEdu = require('./api/componentes/centro_educativo_niveles/CEduNiveles.route');
app.use('/api', CompNivelesCEdu);

const CompUsuario = require('./api/componentes/usuarios/usuario.route');
app.use('/api', CompUsuario);

const CompRegistrarCEdu = require('./api/componentes/centro_educativo/centroEducativo.route');
app.use('/api', CompRegistrarCEdu);

const CompCredenciales = require('./api/componentes/credenciales/credenciales.route');
app.use('/api', CompCredenciales);

const CompRegistroPadres = require('./api/componentes/registro_padre/registro_padre_route');
app.use('/api', CompRegistroPadres);

const CompArticulos = require('./api/componentes/articulos/articulos.route');
app.use('/api', CompArticulos);

const CompListaUtiles = require('./api/componentes/lista_utiles/lista_utiles.route');
app.use('/api', CompListaUtiles);

const citas = require('./api/componentes/citas/citas.route');
app.use('/api', citas);

const actividades = require('./api/componentes/actividad/registrar_actividad.route');
app.use('/api', actividades);

const preguntasFrecuentes = require('./api/componentes/preguntas_frecuentes/preguntas_frecuentes.route');
app.use('/api', preguntasFrecuentes);


const noticias = require('./api/componentes/noticia/registrar_noticia.route');
app.use('/api', noticias);

const etiquetas = require ('./api/componentes/etiquetas/etiquetas.route');
app.use('/api', etiquetas);

const rubros = require ('./api/componentes/rubros/rubros.route');
app.use('/api', rubros);

const calificacion_padre = require ('./api/componentes/calificacion_padre/calificacion_padre.route');
app.use('/api', calificacion_padre);

const calificacionMep = require ('./api/componentes/calificacionMep/calificacionMep.route');
app.use('/api', calificacionMep);

const CompServicios = require('./api/componentes/servicios/servicios.route');
app.use('/api',CompServicios);

const CompInstalacion = require('./api/componentes/instalacion/instalacion.route');
app.use('/api', CompInstalacion);




module.exports = app;