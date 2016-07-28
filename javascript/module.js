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



    app.factory('edCriFactory', function(){
        var factory = {
            nav_selected : null,
            select_nav: function(name){
            factory.nav_selected=name;
            },
        };
        return factory;

    });

    app.controller('navController', function($scope,edCriFactory) {
        $scope.setNav = function (nav) {
            edCriFactory.select_nav(nav);
        };
    });

    app.controller('EdCriController', function ($scope,edCriFactory) {
        $scope.fable_id=1;
        $scope.$on('$includeContentLoaded', function(event,src) {
            $('[data-toggle="tooltip"]').tooltip();
            if(src=='partials/fables/f1-BPL-ed-crit-lat.htm'){
                $(".zb").zbox();
            }
        });
    });


    app.controller('ImageController', function ($scope) {
        $scope.fable_id=1;
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


app.directive('highlight', ['edCriFactory', function(edCriFactory){
    return {
        restrict : 'A',
        link : function(scope, element, attr){
            scope.$watch(function(){
                return edCriFactory.nav_selected;
            }, function(newValue, oldValue) {
                if(attr.highlight.indexOf(newValue)>=0){
                   element.toggleClass('highlight',true);
                }else{
                    element.toggleClass('highlight',false);
                }
            });

        }
    };
}]);