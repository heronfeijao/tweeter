$(document).ready(() => {

  // $('main').scroll(function() {
  //   console.log('event fired');
  // }).trigger(console.log('AAAH'));

  $(window).scroll(function () {
    // scrollToTop is not a function - changed to scrollTop
    if ($(this).scrollTop() > 100) {
      $('#scroll-top').fadeIn();
      $('.nav-newtweet').fadeOut();
    } else {
      $('#scroll-top').fadeOut();
      $('.nav-newtweet').fadeIn();
    }
  });

});