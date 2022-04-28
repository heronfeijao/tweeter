/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  $('#scroll-top').hide();

  $('#scroll-top').click(() => {
    $(document).scrollTop(0);
    $('.new-tweet').slideDown();
    $('.tweetform').select();
  });

  $newTweet = $('.new-tweet');
  $($newTweet).hide();

  $('.nav-newtweet').click(function(e) {
    e.preventDefault();
    $newTweet.slideToggle();
    $('.tweetform').select();
  });


  // -- RENDER OF DATABASE TWEETS --
  $.ajax({
    type: "GET",
    url: "/tweets",
  }).then((res) => {
    renderTweets(res);
  });

  // -- CREATE TWEET ARTICLE --
  const noHacking = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    let $tweet =
      `<article>
      <header>
        <div class="avatarName">
        <img class ="avatar" src="${noHacking(tweet.user.avatars)}" alt="avatar">
        <p class="username">${noHacking(tweet.user.name)}</p>
        </div>
        <h4 class="handle">${noHacking(tweet.user.handle)}</h3>
      </header>
      <div class="tweet">
        <p>${noHacking(tweet.content.text)}</p>
      </div>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag icon"></i>
          <i class="fa-solid fa-retweet icon"></i>
          <i class="fa-solid fa-heart icon"></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  // -- RENDER DATABASE TWEETS --
  const renderTweets = (tweets) => {
    for (const t of tweets) {
      $('#tweets-container').prepend(createTweetElement(t));
    }
  };

  // -- RENDER THE LAST POSTED TWEET --
  const renderLastTweet = (tweet) => {
    $('#tweets-container').prepend(createTweetElement(tweet));
  };

  // -- AJAX REQ FOR RENDERING LAST TWEET --
  const lastTweet = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then((res) => {
        const lastTweet = res[res.length - 1];
        return renderLastTweet(lastTweet);
      });
  };

  // -- TWEET SUBMIT REQUEST --
  $('form').submit(function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    const counterLength = $('.counter').val();
    const $error = $('.err');

    if (counterLength < 0) {
      $error.text('Your message cannot have more than 140 characters.');
      $error.addClass('error');
      $error.slideDown();
      setTimeout(() => {
        $error.slideUp();
      }, 5000);
      return;
    }

    if (data === "text=") {
      $error.text('Your message cannot be empty');
      $error.addClass('error');
      $error.slideDown();
      setTimeout(() => {
        $error.slideUp();
      }, 5000);
      return;
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data
    }).then(() => {
      lastTweet();
    });

    $('form').trigger("reset");
  });

});