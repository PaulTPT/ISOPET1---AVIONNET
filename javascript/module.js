/**
 * Created by paultpt on 03/02/16.
 */


var app = angular.module("joanaApp", []);

app.controller('FablesController', function ($scope) {

    $scope.fable_p = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices pretium lacinia. Sed eleifend\
                    aliquet maximus. Proin viverra et ex vel semper. Integer metus lacus, viverra a diam sed, aliquam\
                    iaculis dolor. Nulla sit amet sagittis mauris. Nullam sodales vehicula ipsum. Aliquam laoreet varius\
                    diam id feugiat. Pellentesque et arcu et ligula tempus venenatis id nec enim. Donec in feugiat arcu.\
                    Duis et dictum dui. Mauris non urna velit. Vestibulum rhoncus ullamcorper lectus. Donec maximus laoreet\
                    magna a lacinia.",

        'Vivamus nulla ex, aliquet eu rutrum sed, suscipit id velit. Curabitur nec eros risus. Proin luctus sapien\
        eu est iaculis, in tristique ligula posuere. Nam laoreet urna eu imperdiet venenatis. Vestibulum accumsan\
        mauris sed ipsum elementum, sed convallis velit tempor. Suspendisse a sapien vel erat elementum mattis.\
        Sed nec sapien pellentesque, accumsan erat vel, scelerisque sapien. Phasellus ullamcorper urna ac risus\
        pellentesque, quis varius dolor congue. Quisque nec velit sed turpis faucibus varius. Cras nec placerat neque,\
        eu aliquam erat. Donec ultricies, sem eget hendrerit fringilla, mi leo ornare eros, vel venenatis velit purus\
        id libero. Proin mollis varius ex. Sed quis magna condimentum ex tristique laoreet nec ut nibh.',

        'Curabitur iaculis, est quis sagittis interdum, sapien massa tincidunt libero, quis laoreet elit dui eu dui.\
        Duis sed porttitor nisi. Vestibulum ultrices ante ante, nec convallis elit pulvinar egestas. Duis mollis nec\
        tortor sit amet maximus. Ut ac justo justo. Vestibulum eu augue eros. Aliquam velit ex, malesuada et bibendum\
        in, condimentum et lectus. Cras congue auctor fermentum. Integer varius ac nulla nec dapibus. Nam rhoncus nisi\
        ut ultrices varius. Fusce efficitur varius nisi, sed tincidunt odio convallis id. Pellentesque finibus enim est,\
        vitae porttitor odio volutpat vel.'];
});


app.controller('HeaderController', function ($scope) {

    $scope.desc = "";
    $scope.showDesc = function (text) {
        $scope.desc = text;
    };
    $scope.clearDesc = function () {
        $scope.desc = "";
    };

});