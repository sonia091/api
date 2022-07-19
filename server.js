const http = require('http');
const express = require('express');
var app = express();
const server = http.createServer(app);
const port = "3000";
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "siturbides",
  password: "00100267590",
  database: "clinica"
});

app.get('/insertDoctor/:object', (req, res) => {
  var object= JSON.parse(req.params.object);

  var cdoctor = object["cdoctor"];
  var adoctor = object["adoctor"];
  var ndoctor = object["ndoctor"];
  var financiamiento = object["financiamiento"];
  var direccion = object["direccion"];
  var centromedico = object["centromedico"];

       
  var sql = `INSERT INTO doctores (cdoctor, adoctor, ndoctor, financiamiento, direccion, centromedico) VALUES ("${cdoctor}", "${adoctor}", "${ndoctor}", "${financiamiento}","${direccion}","${centromedico}")`;
  con.query(sql, function(err, result) {
    if (err) throw err;
     req.flash('success', 'Data added successfully!');
     res.redirect('/');
 
  });
  
})


app.get('/insertEnfermedades/:object', (req, res) => {
  var object= JSON.parse(req.params.object);


  var nenfermedad = object["nenfermedad"];
  var codigo = object["codigo"];
  var sistema = object["sistema"];
  var padecimiento = object["padecimiento"];
  var cpaciente = object["cpaciente"];

  var sql = `INSERT INTO enfermedades(nenfermedad, codigo, sistema, padecimiento, cpaciente) VALUES ("${nenfermedad}", "${codigo}", "${sistema}", "${padecimiento}","${cpaciente}")`;
  con.query(sql, function(err, result) {
    if (err) throw err;

    req.flash('success', 'Data agregada!');
    req.redirect('/');
  });

})


app.get('/insertPaciente/:object', (req, res) => {
  var object= JSON.parse(req.params.object);

  var nsocial = object["nsocial"];
  var npaciente = object["npaciente"];
  var apellidos = object["apellidos"];
  var sexo = object["sexo"];
  var direccion = object["direccion"];
  var provincia = object["provincia"];
  var ntelefono = object["ntelefono"];
  var observacion =object["obvervacion"];
  var cdoctor = object["cdoctor"];

  var sql = `INSERT INTO doctores (nsocial, npaciente, apellidos, sexo, direccion, provincia, ntelefono, observacion,cdoctor) 
  VALUES ("${nsocial}","${npaciente}","${apellidos}","${sexo}","${direccion}","${provincia}","${ntelefono}","${observacion}","${cdoctor}")`;
  
  con.query(sql, function(err, result) {
    if (err) throw err;

    req.flash('success', 'Data added successfully!');
    res.redirect('/');
  });

})

app.get('/selectEnfermedades', (req, res) => {

  var sql = "SELECT * FROM enfermedades";
  
  con.query(sql, function(err, result) {
    if (err) throw err;

    res.send(result);
  });

})


app.get('/selectDoctores', (req, res) => {


  var sql = "SELECT * FROM Doctores";
  
  con.query(sql, function(err, result) {
    if (err) throw err;

    res.send(result);
  });

})


app.get('/selectPacientes', (req, res) => {


  var sql = "SELECT * FROM pacientes";
  
  con.query(sql, function(err, result) {
    if (err) throw err;

    res.send(result);
  });

})


app.get('/deleteEnfermedad/:codigo', (req, res) => {

  var sql = "SELECT * FROM enfermedades where codigo = ?";
  
  con.query(sql,req.params.codigo, function(err, result) {
    if (err) throw err;

    req.flash('success', 'Data deleted successfully!');
    res.redirect('/');
  });

})


app.get('/deleteDoctor/:cdoctor', (req, res) => {


  var sql = "DELETE * FROM Doctores where cdoctor=?";
  
  con.query(sql,req.params.cdoctor, function(err, result) {
    if (err) throw err;

    req.flash('success', 'Data deleted successfully!');
    res.redirect('/');
  });

})


app.get('/deletePacientes/:nsocial', (req, res) => {


  var sql = "SELECT * FROM pacientes where nsocial=?";
  
  con.query(sql,req.params.nsocial, function(err, result) {
    if (err) throw err;

    req.flash('success', 'Data deleted successfully!');
    res.redirect('/');
    });

})




app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.json({"Error": "something occured"});
});


server.listen(port);

console.log('Listening on: ' + port);