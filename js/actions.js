var searchButton = document.getElementById('searchButton');
var searchResults = function(searchValue) {
  var params = {
      q: searchValue,
      type: 'artist',
      limit: 50
};
  url = 'https://api.spotify.com/v1/search';
  $.getJSON(url, params, function(data) {
    $('li').remove();
  console.log(data);
    for (var i = 0; i < data.artists.items.length; i++) {
      var resultItems = data.artists.items[i].name;
      $('ul').append('<li><div class="resultsListBar">'+resultItems+'</div></li>');
    }
  });
};

$(document).ready(function() {
  searchButton.onclick = function(event) {
    event.preventDefault();
    var searchValue = $('#artistName').val();
    searchResults(searchValue);
    $('#artistName').val('');
  }
});
