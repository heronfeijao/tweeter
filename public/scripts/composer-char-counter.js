$(document).ready(function () {

  $('.tweetform').on('input', function(event) {
    const text = $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.val(() => {
      const count = 140;
      if (count - text < 0) {
        $(counter).css("color", "red");
      }
      if (count - text >= 0) {
        $(counter).css("color", "");
      }
      return count - text;
    });
  });

});