var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contenido_schema = new Schema({
	titulo:{type:String,required:true},
	fecha_hora:Date,
	cuerpo:{type:String,required:true},
});

mongoose.model("Contenido",contenido_schema);


