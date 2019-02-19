$(document).ready(function() {
  //$.ajaxSetup({ cache: false });
  function getCall(force) {
    var searchField = $('#search').val();
    var expression = new RegExp(searchField, 'i');
    if (!force && searchField.length < 3) return; //wasn't enter, not > 2 char
    $.getJSON('js/data.json', function(data) {
      $.each(data, function(key, value) {
        if (
          value.name.search(expression) != -1 ||
          value.location.search(expression) != -1
        ) {
          $('#result').append(
            '<li class="list-group-item link-class">' +
              value.name +
              ' | <span class="text-muted">' +
              value.location +
              '</span></li>'
          );
        }
      });
    });
  }

  var search_timeout = undefined;
  $('#search').keyup(function(e) {
    $('#result').html('');
    $('#state').val('');
    if (search_timeout != undefined) {
      clearTimeout(search_timeout);
    }
    search_timeout = setTimeout(function() {
      search_timeout = undefined;
      getCall();
    }, 500);
  });
  $('#result').on('click', 'li', function() {
    var click_text = $(this)
      .text()
      .split('|');
    $('#search').val($.trim(click_text[0]));
    $('#result').html('');
  });
});
