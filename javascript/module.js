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
        $scope.fable_name = FableFactory.getFable_title();
        $scope.fables=FableFactory.getFables();
    });

    $scope.$watch(function(){
        return FableFactory.category;
    }, function(NewValue, OldValue){
        $scope.category = FableFactory.category;
    });

    $scope.$watch(function(){
        return FableFactory.subcategory;
    }, function(NewValue, OldValue){
        $scope.subcategory = FableFactory.subcategory;
    });

    var unSlick = function() {
        $('img').removeData('elevateZoom');
        $('.zoomWrapper img.zoomed').unwrap();
        $('.zoomContainer').remove();
        $('.zoomWindowContainer').remove();
        $('.slick').slick('removeSlide', null, null, true);
        $('.slick').slick('unslick');
    };

    $scope.category = 'BPL';
    $scope.subcategory = 'P';

    $scope.next_fable = function () {
        FableFactory.next_fable();
        unSlick();
    };

    $scope.prev_fable = function () {
        FableFactory.prev_fable();
        unSlick();
    };
    $scope.setFable = function (id) {
        FableFactory.setFable(id-1);
        unSlick();
    };
    $scope.setCategory = function (cat) {
        FableFactory.setCategory(cat);
        unSlick();
    };
    $scope.setSubcategory = function (subcat) {
        FableFactory.setSubcategory(subcat);
        unSlick();
    };




});

app.factory('FableFactory', function ($http) {

    var factory = {
        num_fables: 4,
        fable_num: -1,
        fables: [],
        category: "abc",
        subcategory:"c",
        next_fable: function () {
            factory.fable_num = (factory.fable_num + 1) % factory.num_fables;
        },
        prev_fable: function () {
            factory.fable_num = (((factory.fable_num - 1) % factory.num_fables) + factory.num_fables) % factory.num_fables;
        },
        getFable_num: function () {
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
        getFables : function () {
            return factory.fables;
        },
        setFable : function(id){
            factory.fable_num=id;
        },
        setCategory : function (cat) {
            if(cat!=factory.category){
                if(cat=="abc"){
                    factory.subcategory="c";
                }
                if(cat=="BPL"){
                    factory.subcategory="B";
                }
                factory.category=cat;
            }


        },
        setSubcategory : function (subcat) {
            factory.subcategory=subcat;
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

    $scope.loading = function (){
        //$('[data-toggle="tooltip"]').tooltip('dispose');
        setInterval(function(){
            $('[data-toggle="tooltip"]').tooltip();
            $(".zb").zbox();
        },
        100);
    };

    $scope.$watch(function(){
        return FableFactory.fable_num;
    }, function(NewValue, OldValue){
        $scope.fable_name = FableFactory.getFable_title();
        $scope.fables=FableFactory.getFables();
        $scope.fable_id = FableFactory.fable_num + 1;
    });

    $scope.$watch(function(){
        return FableFactory.category;
    }, function(NewValue, OldValue){
        $scope.category = FableFactory.category;

    });

    $scope.$watch(function(){
        return FableFactory.subcategory;
    }, function(NewValue, OldValue){
        $scope.subcategory = FableFactory.subcategory;
    });

    $scope.choice = "Traduction";

    $scope.setChoice = function(choice){
        $scope.choice=choice;
    }


});


app.controller('ImageController', function ($scope,FableFactory) {
    $scope.$watch(function(){
        return FableFactory.fable_num;
    }, function(NewValue, OldValue){
        $scope.fable_name = FableFactory.getFable_title();
        $scope.fables=FableFactory.getFables();
        $scope.fable_id = FableFactory.fable_num + 1;
    });

    $scope.$watch(function(){
        return FableFactory.category;
    }, function(NewValue, OldValue){
        $scope.category = FableFactory.category;
    });

    $scope.$watch(function(){
        return FableFactory.subcategory;
    }, function(NewValue, OldValue){
        $scope.subcategory = FableFactory.subcategory;
    });

});
app.controller('CompController', function ($scope,FableFactory) {
    $scope.$watch(function(){
        return FableFactory.fable_num;
    }, function(NewValue, OldValue){
        $scope.fable_name = FableFactory.getFable_title();
        $scope.fables=FableFactory.getFables();
        $scope.fable_id = FableFactory.fable_num + 1;
    });

    $scope.$watch(function(){
        return FableFactory.category;
    }, function(NewValue, OldValue){
        $scope.category = FableFactory.category;
    });

    $scope.$watch(function(){
        return FableFactory.subcategory;
    }, function(NewValue, OldValue){
        $scope.subcategory = FableFactory.subcategory;
    });

});


app.controller('TransController', function ($scope, FableFactory) {
        $scope.loading = function (){
            $(document).ready(function() {
                $('.slick').slick({
                    slide: 'div',
                    dots: true,
                });
                $('img').removeData('elevateZoom');
                $('.zoomWrapper img.zoomed').unwrap();
                $('.zoomContainer').remove();
                $('.zoomWindowContainer').remove();
                $(".slick-current img").elevateZoom({
                    scrollZoom: true,
                    zoomType: "inner",
                    cursor: "crosshair"
                });

                $('.slick').on('afterChange', function (slick, currentSlide) {
                        $('img').removeData('elevateZoom');
                        $('.zoomWrapper img.zoomed').unwrap();
                        $('.zoomContainer').remove();
                        $('.zoomWindowContainer').remove();
                        $(".slick-current img").elevateZoom({
                            scrollZoom: true,
                            zoomType: "inner",
                            cursor: "crosshair"
                        });
                });
            });
        };

    $scope.$watch(function(){
        return FableFactory.fable_num;
    }, function(NewValue, OldValue){
        $scope.fable_name = FableFactory.getFable_title();
        $scope.fables=FableFactory.getFables();
        $scope.fable_id = FableFactory.fable_num + 1;
    });

    $scope.$watch(function(){
        return FableFactory.category;
    }, function(NewValue, OldValue){
        $scope.category = FableFactory.category;
    });

    $scope.$watch(function(){
        return FableFactory.subcategory;
    }, function(NewValue, OldValue){
        $scope.subcategory = FableFactory.subcategory;
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
        $('img').removeData('elevateZoom');
        $('.zoomWrapper img.zoomed').unwrap();
        $('.zoomContainer').remove();
        $('.zoomWindowContainer').remove();
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