var mongoose = require('mongoose');
var Con = mongoose.model('Contenido');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.main = function(req, res ) {
  res.render('index', { title: 'Main' });
};

module.exports.newBlog = function(req, res ){
	if(!req.body.titulo || req.body.titulo==""){sendJsonResponse(res,401,{msjerr:'falta titulo'})}
	if(!req.body.cuerpo || req.body.cuerpo==""){sendJsonResponse(res,401,{msjerr:'falta cuerpo'})}
	var nuevo = {
		titulo: req.body.titulo,
		fecha_hora: new Date(),
		cuerpo: req.body.cuerpo,
	};
	Con.create(nuevo,function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{sendJsonResponse(res,201,dato);}
	});
}

module.exports.getBlog = function(req, res){
	Con.find({},function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{sendJsonResponse(res,200,dato);}
	});
};

module.exports.getIdBlog = function(req, res){
	Con
	.findById(req.params.blogid)
	.exec(function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{sendJsonResponse(res,200,dato);}
	});
}

module.exports.updateBlog = function(req, res){
	Con
	.findById(req.params.blogid)
	.exec(function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{
			if(!req.body.titulo || req.body.titulo==""){sendJsonResponse(res,401,{msjerr:'falta titulo'})}
			if(!req.body.cuerpo || req.body.cuerpo==""){sendJsonResponse(res,401,{msjerr:'falta cuerpo'})}
			dato.titulo = req.body.titulo;
			dato.cuerpo = req.body.cuerpo;
			dato.save(function(err,dato){
				if(err){sendJsonResponse(res,401,{msjerr:err})}
				else{sendJsonResponse(res,200,dato);}
			});
		}
	});
}

module.exports.deleteBlog = function(req, res){
	Con
	.findByIdAndRemove(req.params.blogid)
	.exec(function(err,dato){
		if(err){sendJsonResponse(res,404,{msjerr:err})}
		else{sendJsonResponse(res,204,dato);}
	});
}