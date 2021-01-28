/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  //make ajax GET request to /tweets and receive an array of tweets in json
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  loadTweets();

  //make ajax POST request to send data to the server 
  //handle submit event and prevent default form submission to stay on the page

  $('form').submit(function (event) {
    event.preventDefault();

    const val = $('textarea').val();

    if (val.length > 140) {
      $('.error-word-limit').show();
    } else if (!(/\S/.test(val))) {
      $('.error-empty-text').show();
    } else {
      $('.error-word-limit').hide();
      $('.error-empty-text').hide();
      const tweetText = $(this).serialize();
    $.post('/tweets', tweetText) 
      .then((response) => {
        loadTweets();
      })
    }
  });

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  //create function to render tweets

  function renderTweets(tweets) { //input: array of objects

    $('.all-tweets').empty();
    
    for (tweet of tweets) {
      createTweetElement(tweet);
      // $('#tweet-text').empty();
    };

    function createTweetElement(object) {
      const tweet = escape(object.content.text);
      const user = object.user;
      const userFullName = user.name;
      const avatar = user.avatars;
      const userHandle = user.handle;
      const date = object.created_at;
  
      const markup = `
      <article class="tweet-container">
      <header class="profile">
        <div class='img'>
        <img src="${avatar}">
       </div>
        <div class="user-fullname">
          <h2>${userFullName}</h2>
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
  
      const $tweet = $('.all-tweets').prepend(markup);
      return $tweet;
    }
  }
  });
