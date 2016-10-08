"use strict";$.urlParam=function(a,b){var c=new RegExp("[?&]"+b+"=([^&#]*)").exec(a);return null===c?null:c[1]||0},angular.module("obrasMduytApp",["ngRoute","ngSanitize","slugifier"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl",controllerAs:"home"}).when("/obra/:id",{templateUrl:"views/obra.html",controller:"ObraCtrl",controllerAs:"obra"}).when("/entorno/:entorno",{templateUrl:"views/entorno.html",controller:"EntornoCtrl",controllerAs:"entorno"}).otherwise({redirectTo:"/home"})}]).service("DataService",["$http","$q","Slug",function(a,b,c){var d=void 0,e=function(a){return a.entorno_slug=a.entorno?c.slugify(a.entorno):null,a.tipo=a.tipo?a.tipo.split("|"):[],a.comuna=a.comuna?a.comuna.split("|"):[],a.barrio=a.barrio?a.barrio.split("|"):[],a.licitacion_oferta_empresas=a.licitacion_oferta_empresas?a.licitacion_oferta_empresas.split("|"):[],a.id=parseInt(a.id),a.licitacion_anio=a.licitacion_anio?parseInt(a.licitacion_anio):null,a.monto_contrato=a.monto_contrato?parseFloat(a.monto_contrato):null,a.licitacion_presupuesto_oficial=a.licitacion_presupuesto_oficial?parseFloat(a.licitacion_presupuesto_oficial):null,a.plazo_meses=a.plazo_meses?parseInt(a.plazo_meses):null,a.porcentaje_avance=a.porcentaje_avance?parseFloat(a.porcentaje_avance):null,a},f=function(){return window.MDUYT_CONFIG||(console.error("Archivo de configuración inexistente, utilizando configuración default de desarrollo."),window.MDUYT_CONFIG={BASE_URL:"http://api.topranking.link/",HOME_CSV:"https://goo.gl/vcb6oX"}),window.MDUYT_CONFIG.BASE_URL+"?source_format=csv&source="+window.MDUYT_CONFIG.HOME_CSV+"&callback=JSON_CALLBACK"};this.getById=function(a){var c=void 0,d=b.defer();return this.retrieveAll().then(function(b){c=b.filter(function(b){return b.id==parseInt(a)}),d.resolve(c[0])}),c=d.promise,b.when(c)},this.getByEntorno=function(a){var c=void 0,d=b.defer();return this.retrieveAll().then(function(b){c=b.filter(function(b){return b.entorno_slug==a}),d.resolve(c)}),c=d.promise,b.when(c)},this.getAll=function(){var a=void 0,c=b.defer();return this.retrieveAll().then(function(a){c.resolve(a)}),a=c.promise,b.when(a)},this.retrieveAll=function(){if(!d){var c=b.defer();a.jsonp(f()).then(function(a){d=a.data.map(e),c.resolve(d)},function(a){d=a,c.reject(a)}),d=c.promise}return b.when(d)}}]).run(["$rootScope","$interval",function(a,b){}]),angular.module("obrasMduytApp").controller("HomeCtrl",["$scope","DataService",function(a,b){a.pymChild=new pym.Child({polling:1e3}),a.pymChild.sendHeight(),b.getAll().then(function(b){console.log(b),a.obras=b})}]),angular.module("obrasMduytApp").controller("ObraCtrl",["$scope","DataService","$routeParams",function(a,b,c){a.pymChild=new pym.Child({polling:1e3}),a.pymChild.sendHeight(),a.obraId=c.id,b.getById(c.id).then(function(b){console.log(b),a.obra=b})}]),angular.module("obrasMduytApp").controller("EntornoCtrl",["$scope","DataService","$routeParams",function(a,b,c){a.pymChild=new pym.Child({polling:1e3}),a.pymChild.sendHeight(),b.getByEntorno(c.entorno).then(function(b){a.entorno=c.entorno,console.log(b),a.obras=b})}]),angular.module("obrasMduytApp").run(["$templateCache",function(a){a.put("views/entorno.html",'<div class="row"> <div class="col-md-12"> <h1>Entorno: {{entorno}}</h1> <p>Obras: {{obras.length}}</p> <p ng-repeat="obra in obras"> Obra: {{$index+1}} -> {{obra}} </p> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Galería]</h4> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Datos]</h4> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Mapa]</h4> </div> </div>'),a.put("views/home.html",'<div class="row"> <div class="col-md-12"> <h1>HOME</h1> <p>Cargadas: {{obras.length}} obras</p> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Animacion SVG]</h4> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Mapa tentativo]</h4> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Sankey]</h4> </div> </div>'),a.put("views/obra.html",'<div class="row"> <div class="col-md-12"> <h1>Id de Obra: {{obraId}}</h1> <p>Obra: {{obra}}</p> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Galería]</h4> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Datos]</h4> </div> </div> <div class="row"> <div class="col-md-12"> <h4>[Mapa]</h4> </div> </div>')}]);