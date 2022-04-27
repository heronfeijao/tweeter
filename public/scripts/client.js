/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  $.ajax({
    type: "GET",
    url: "/tweets",
  }).then((res) => {
    renderTweets(res);
  });

  const createTweetElement = (tweet) => {
    let $tweet =
      `<article>
      <header>
        <div class="avatarName">
        <img class ="avatar" src="${tweet.user.avatars}" alt="avatar">
        <p class="username">${tweet.user.name}</p>
        </div>
        <h4 class="handle">${tweet.user.handle}</h3>
      </header>
      <div class="tweet">
        <p>${tweet.content.text}</p>
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

  const renderTweets = (tweets) => {
    for (const t of tweets) {
      $('#tweets-container').prepend(createTweetElement(t));
    }
  };

  const renderLastTweet = (tweet) => {
    $('#tweets-container').prepend(createTweetElement(tweet));
  };

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

  $('form').submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    const counterLength = $('.counter').val();

    if (counterLength < 0) {
      alert('Your message cannot have more than 140 characters.');
      return;
    }

    if (data === "text=") {
      alert('Your message cannot be empty');
      return;
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data
    }) .then(() => {
      lastTweet();
    });

    $('form').trigger("reset");
  });

});