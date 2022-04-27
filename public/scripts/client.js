/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const getDaysAgo = (time) => {
    const today = new Date();
    const pastDay = new Date(time);
    const timeDays = Math.round((today - pastDay) / 86400000);
    return timeDays;
  };

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
      $('#tweets-container').append(createTweetElement(t));
    }
  };

  $('.load-tweets').on('click', function () {
    $.ajax('/tweets', {
      type: 'GET',
      url: "/tweets"
    })
      .then((res) => {
        renderTweets(res);
      });
  });

  $('form').submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    
    if (data.length > 145) {
      alert('Your message cannot have more than 140 characters.');
    }
    if (data.length === 0) {
      alert('Your message cannot be empty');
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: data
    })
      .then((res) => console.log(res));

  });

});