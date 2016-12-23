
function localData ($http) {
	var showData = function(){return $http.get('/api/blog');}
	var newData = function(data){return $http.post('/api/blog',data);}
	var deleteData = function(idBlog){return $http.delete('/api/blog/'+idBlog);}
	var getByIdData = function(idBlog){return $http.get('/api/blog/'+idBlog);}
	return {
      showData : showData,
      newData : newData,
      deleteData : deleteData,
      getByIdData : getByIdData
    };
}


function config ($routeProvider,$locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'homePage.html',
			controller: 'homePageCrtl',
			controllerAs: 'vm'
		})
		.when('/nuevo',{
			templateUrl: 'newBlogPage.html',
			controller: 'newPageCrtl',
			controllerAs: 'vm'
		})
		.when('/contenido/:idblog',{
			templateUrl: 'blogPage.html',
			controller: 'blogPageCrtl',
			controllerAs: 'vm'
		})
		.when('/error',{
			templateUrl: 'error.html',
		})
		.otherwise({redirectTo: '/error'});
	//$locationProvider.html5Mode({enabled: true, requireBase: false});
}

var homePageCrtl = function(localData){
	var vm = this;

	vm.getData = function(){
		localData.showData()
			.success(function(data) {
				vm.blog = data;
			})
			.error(function (e) {
				console.log(e);
			});
	}
	
	vm.getData();
}

var newPageCrtl = function(localData){
	var vm = this;
	vm.err = "";
	vm.blog = {
		titulo: "",
		cuerpo : ""
	}
	vm.onSubmit = function(){
		localData.newData({
			titulo : vm.blog.titulo,
			cuerpo : vm.blog.cuerpo
		})
			.success(function(data) {
				vm.err = "correcto";
			})
			.error(function (e) {
				vm.err = e;
			});
	};
}

var blogPageCrtl = function($location,$routeParams,localData){
	var vm = this;
	vm.err = "";
	vm.idBlog = $routeParams.idblog;
	vm.getData = function(){
		localData.getByIdData(vm.idBlog)
			.success(function(data) {
				vm.blog = data;
			})
			.error(function (e) {
				console.log(e);
			});
	}
	vm.deleteData = function(){
		localData.deleteData(vm.idBlog)
			.success(function(data) {
				vm.err = data;
			})
			.error(function (e) {
				console.log(e);
			});
	}
	vm.onclik = function(){
		vm.deleteData();
		$location.path('/');
	}
	vm.getData();
}//*/

angular.module('myApp',['ngRoute'])
  .controller('homePageCrtl',homePageCrtl)
  .controller('newPageCrtl',newPageCrtl)
  .controller('blogPageCrtl',blogPageCrtl)
  .service('localData', localData)
  .config(['$routeProvider','$locationProvider',config]);
