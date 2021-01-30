$(() => {

  //-- Plugin for dayjs ---//
  dayjs.extend(window.dayjs_plugin_relativeTime);



  //--- LOAD tweet function & GET request to /tweets ---//
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadTweets();



  //--- Handle compose button ---//
  const $composeButton = $('#subtitle');
  $composeButton.click(() => {
    document.getElementById('tweet-text').focus();
  });


  //--- POST request to send data to server ---//
  $('form').submit(function(event) {

    event.preventDefault();

    const textVal = $('textarea').val();

    //error handling 
    if (textVal.length > 140) {
      $('.error-empty-text').hide();
      $('.error-word-limit').slideDown('slow');

    } else if (!(/\S/.test(textVal))) {
      $('.error-word-limit').hide();
      $('.error-empty-text').slideDown('slow');

    } else {
      $('.error-word-limit').hide();
      $('.error-empty-text').hide();

      const tweetText = $(this).serialize();

      $.post('/tweets', tweetText)
        .then(() => {
          loadTweets();
          $('.counter').val(140);
          $('textarea').val('');
        });
    }

  });


  //--- ESCAPE function to prevent XSS ---//
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //--- RENDER tweet function ---//
  function renderTweets(tweets) {

    //empty all child nodes
    $('.all-tweets').empty();
    
    for (let tweet of tweets) {
      createTweetElement(tweet);
    }


    //--- CREATE tweets from objects ---//
    function createTweetElement(object) {
      const tweetContent = escape(object.content.text);
      const user = object.user;
      const userFullName = user.name;
      const avatar = user.avatars;
      const userHandle = user.handle;
      const date = new Date(object.created_at).toISOString();
      const time = dayjs(date).fromNow();

      const markup = `
      <article class='tweet-container'>
      <header class='profile'>
        <div class='img'>
        <img src="${avatar}">
        </div>
        <div class="user-info">
        <div class='user-fullname'>
          <h2>${userFullName}</h2>
        </div>
        <div class='username'>
          <h2>${userHandle}</h2>
        </div>
        </div>
      </header>
  
      <div class='tweets'>
        <p>${tweetContent}</p>
      </div>
  
      <footer>
        <div class='date'>
        <p>Posted ${time}</p>
        </div>
        <div class='icons'>
          <i class="far fa-flag fa-2x"></i>
          <i class="fas fa-retweet fa-2x"></i>
          <i class="far fa-heart fa-2x"></i>
        </div>
      </footer>
    </article>
      `;
  
      const $tweet = $('.all-tweets').prepend(markup);
      return $tweet;
    }
  }
});