$(() => {

$("#tweet-text").on('keyup', function() {
  let text = $(this).val();
  let textCount = 140 - text.length;

  if (textCount >= 0 ) {
    $('.counter').removeClass('over-word-limit');
  } else {
    $('.counter').addClass('over-word-limit');
  };

  let counter = $(this)
  .siblings('#button-counter')
  .find('.counter');

  counter.val(textCount);

  });
});
