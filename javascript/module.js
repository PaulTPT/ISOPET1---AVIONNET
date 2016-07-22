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

    app.controller('EdCriController', function ($scope) {
        $scope.fable_id=1;
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
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
