var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*
var comentario_schema = new Schema({
	fecha_hora:Date,
	detalle:{type:String,required:true},
});//*/

var contenido_schema = new Schema({
	titulo:{type:String,required:true},
	fecha_hora:Date,
	cuerpo:{type:String,required:true},
	//cometarios:[comentario_schema]
});

mongoose.model("Contenido",contenido_schema);


