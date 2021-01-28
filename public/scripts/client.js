/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('form').submit(function (event) {
    console.log('handler for submit called')
    event.preventDefault();
  
    $.ajax({
      url: '/tweets',
      method: 'POST', 
      data: $(this).serialize()
    })
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  const $tweetButton = $('#tweet-button');


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  function renderTweets(tweets) { //input: array of objects
    tweets.forEach(tweet => createTweetElement(tweet));
  }
  
  function createTweetElement(object) {
    const tweet = object.content.text;
    const user = object.user;
    const username = user.name;
    const avatar = user.avatars;
    const userHandle = user.handle;
    const date = object.created_at;
    
    const markup = `
    <article class="tweet-container">
    <header class="profile">
      <div class="img">
      <img src="${avatar}">
      </div>
      <div class="user-fullname">
        <h2>${username}</h2>
      </div>
      <div class="username">
        <h2>${userHandle}</h2>
      </div>
    </header>

    <div class="tweets">
      <p>${tweet}</p>
    </div>

    <footer>
      <div class="date">
      <p>${date}</p>
      </div>

      <div class="icons">
        <img src="/images/flag.svg">
        <img src="/images/repeat.svg">
        <img src="/images/heart.svg">
      </div>
    </footer>
  </article>
    `;

    const $tweet = $('.all-tweets').append(markup);

    return $tweet;
  }

  renderTweets(data)

  });