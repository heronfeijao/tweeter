/* eslint-disable no-undef */
$(document).ready(() => {

  $(document).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#scroll-top').fadeIn();
      $('.nav-newtweet').fadeOut();
    } else {
      $('#scroll-top').fadeOut();
      $('.nav-newtweet').fadeIn();
    }
  });

});