/**
 * Created by paultpt on 03/02/16.
 */


    var app = angular.module("joanaApp", ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/projet/', {templateUrl: 'partials/projet/projet.html'})
            .when('/corpus/', {templateUrl: 'partials/corpus/contenu.html', controller: 'CorpusController'})
            .when('/outils/', {templateUrl: 'partials/outils/outils.html'})
            .when('/bibliographie/', {templateUrl: 'partials/bibliographie/bibliographie.html'})
            .otherwise({redirectTo: '/projet'});

    });

    app.controller('EdCriController', function ($scope, EdCriFactory, $routeParams) {
        $scope.fable_id=1;
        $scope.fable_p=EdCriFactory.getFable_p($scope.fable_id).then(function(fable_p){
            $scope.fable_p=fable_p;
        },function(msg){
            alert(msg);
        });
    });

    var toXML = function(text){
        if(window.ActiveXObject)
        {
            var doc=new ActiveXObject('Microsoft.XMLDOM');
            doc.async='false';
            doc.loadXML(text);
        }
        else
        {
            var parser=new DOMParser();
            var doc=parser.parseFromString(text,'text/xml');
        }
        return doc;
    }

    var ParseFable = function(fable){
        var fable_xml=toXML(fable);
        var element = fable_xml.evaluate("//text[@id='fable0001']/body/div[@id='f1-ms-BPL']/div[@type='edition-critique']/div[@type='edition-critique-latin']//l", fable_xml, null, XPathResult.ORDERED_ANY_TYPE, null );
        var iter = element.iterateNext ();
        var result=[];
        var i =0;
        while (iter) {
            result.push(iter.textContent);
            iter = element.iterateNext ();
            i++;
        }
        console.log(result);
        return result;
    };

    app.factory('EdCriFactory', function($http, $q){
        var factory = {
            getFable_p: function (fable_id) {
                if(factory.fable_id==fable_id){
                    return factory.fable_p;
                }else{
                    var deferred =$q.defer();
                    $http.get('resources/Isopet-codage-fable-' + fable_id +'.xml')
                        .success(function(data, status){
                            factory.fable_p=ParseFable(data);
                            deferred.resolve(factory.fable_p);
                        }).error(function(data, status){
                            deferred.reject('Impossible de récupérer la fable '+fable_id);
                    });
                    return deferred.promise;
                }
            },
            fable_p: false,
            fable_id: 0,
        };
        return factory;

    });


    app.controller('HeaderController', function ($scope) {

        $scope.desc = "";

        $scope.showDesc = function (text) {
            $scope.desc = text;
        };

        $scope.clearDesc = function () {
            $scope.desc = "";
        };

        $scope.desactive = function () {
            $scope.dp = false;
            $scope.af = false;
            $scope.cp = false;
            $scope.bb = false;
        };

        $scope.activedp = function () {
            $scope.desactive();
         };

        $scope.activeaf = function () {
            $scope.desactive();
            $scope.af = true;
        };

        $scope.activecp = function () {
            $scope.desactive();
            $scope.cp = true;
        };

        $scope.activebb = function () {
            $scope.desactive();
            $scope.bb = true;
        };

        $scope.activedp();


    });

    app.controller('CorpusController', function ($scope) {

        $scope.request = "ed_cri";

        $scope.setRequest = function (req) {
            $scope.request = req;
        };

    });
