import $ from 'jquery';

$('.svg').each(function () {
   var width = $(window).width();
   var height = $(window).height();
   var random1 = Math.random();
   var random2 = Math.random();

   console.log('======================', width, height);

   $(this).css('left', ((width * random1)));
   $(this).css('top', ((height * random2)));
});
