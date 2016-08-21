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

app.controller('BarController', function ($scope, FableFactory) {
    $scope.$watch(function(){
        return FableFactory.fable_num;
    }, function(NewValue, OldValue){
        fable_id = FableFactory.getFable_id();
        $scope.fable_name = FableFactory.getFable_title();
    });
    $scope.category = 'BPL';
    $scope.subcategory = 'P';

    $scope.next_fable = function () {
        FableFactory.next_fable();
    };

    $scope.prev_fable = function () {
        FableFactory.prev_fable();
    };

});

app.factory('FableFactory', function ($http) {

    var factory = {
        num_fables: 2,
        fable_num: -1,
        fables: null,
        next_fable: function () {
            factory.fable_num = (factory.fable_num + 1) % factory.num_fables;
        },
        prev_fable: function () {
            factory.fable_num = (((factory.fable_num - 1) % factory.num_fables) + factory.num_fables) % factory.num_fables;
        },
        getFable_id: function () {
            if(factory.fable_num==-1){
                return "Null"
            }else{
                return factory.fables[factory.fable_num].id;
            }
        },
        getFable_title: function () {
            if(factory.fable_num==-1){
                return "Null"
            }else{
                return factory.fables[factory.fable_num].title;
            }
        },
    };

    $http.get('resources/index.json').success(function (data) {
        factory.fables = data.fables;
        factory.fable_num=0;
    });
    return factory;
});

app.factory('edCriFactory', function () {
    var factory = {
        nav_selected: null,
        select_nav: function (name) {
            factory.nav_selected = name;
        }
    };
    return factory;

});

app.controller('navController', function ($scope, edCriFactory) {
    $scope.setNav = function (nav) {
        edCriFactory.select_nav(nav);
    };
});

app.controller('EdCriController', function ($scope, FableFactory) {
    $scope.fable_id = 1;
    $scope.$on('$includeContentLoaded', function (event, src) {
        $('[data-toggle="tooltip"]').tooltip();
        if (src == 'partials/fables/f1-BPL-ed-crit-lat.htm') {
            $(".zb").zbox();
        }
    });
});


app.controller('ImageController', function ($scope) {
    $scope.fable_id = 1;
});

app.controller('TransController', function ($scope) {
    $scope.fable_id = 1;
    $scope.$on('$includeContentLoaded', function (event, src) {
        if (src == 'partials/fables/f1-P-frm-transcription.htm') {
            $('.slick').slick({
                slide: 'div',
                dots: true

            });
        }
        $(".slick-current .im_fable").elevateZoom({
            scrollZoom: true,
            zoomType: "inner",
            cursor: "crosshair"
        });
        $('.slick').on('afterChange', function (slick, currentSlide) {
            $('#zoomed img').removeData('elevateZoom');
            $('.zoomWrapper img.zoomed').unwrap();
            $('.zoomContainer').remove();
            $(".slick-current .im_fable").elevateZoom({
                scrollZoom: true,
                zoomType: "inner",
                cursor: "crosshair"
            });
        });
    });
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


app.directive('highlight', ['edCriFactory', function (edCriFactory) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watch(function () {
                return edCriFactory.nav_selected;
            }, function (newValue, oldValue) {
                if (attr.highlight.indexOf(newValue) >= 0) {
                    element.toggleClass('highlight', true);
                } else {
                    element.toggleClass('highlight', false);
                }
            });

        }
    };
}]);