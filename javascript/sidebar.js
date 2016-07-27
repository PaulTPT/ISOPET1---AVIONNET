/**
 * Created by paultpt on 29/01/16.
 */


function initMenu() {
    $('#menu ul').hide();
    $('#menu ul').children('.current').parent().show();
    $('#menu li a').click(
        function() {
            var checkElement = $(this).next();
            if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                checkElement.slideUp('normal');
                $('#sidebar-wrapper').toggleClass('open',false);
                return false;
            }
            if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                $('#menu ul:visible').slideUp('normal');
                checkElement.slideDown('normal');
                $('#sidebar-wrapper').toggleClass('open',true);
                return false;
            }

            if($(this).is('a')){
                $('#menu ul li a').toggleClass('selected', false);
                $(this).toggleClass('selected', true)
            }
        }
    );
    $('#menu').hover(
        function() {
            return false;
        },
        function() {
            $('#menu ul:visible').slideUp('normal');
            $('#sidebar-wrapper').toggleClass('open',false);
            return false;
        });

}

$(document).ready(function() {
    initMenu();
});