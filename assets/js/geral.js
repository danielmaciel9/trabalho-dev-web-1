$(document).ready(function(){
    $( "#menuMobile" ).click(function() {
        $( ".menuDesktop" ).toggleClass( "activeMenu" );
    });
    $( ".closeMobMenu" ).click(function() {
        $( ".menuDesktop" ).removeClass( "activeMenu" );
    });
  });