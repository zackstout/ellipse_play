
$(document).ready(function() {
  $('#msg').on('click', function() {
    console.log('hi hi');

    $('#message').text('ahoy hoy');

    setTimeout(function() {
      $('#message').text('you took too long!');

    }, 5000);
  });
});
