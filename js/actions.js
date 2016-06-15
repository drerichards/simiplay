var searchButton = document.getElementById('searchButton');
var searchResults = function(searchValue) {
  $('.artistMainPic img').remove();
  var params = {
      q: searchValue,
      type: 'artist',
      limit: 50
};
  url = 'https://api.spotify.com/v1/search';
  $.getJSON(url, params, function(data) {
    $('li').remove();
    console.log(data);
    var artistObjects = data.artists.items;
    for (var i = 0; i < artistObjects.length; i++) {
      var resultItems = artistObjects[i].name;
      $('.resultColumns').append('<li><div class="resultsListBar">'+resultItems+'</div></li>');
    }
    $('li').click(function(event) {
      event.preventDefault();
      var index = $(this).index();
      var artistID = artistObjects[index].id;
      var similarArtURL = 'https://api.spotify.com/v1/artists/'+artistID+'/related-artists';
      $('li').remove();
      $('.artistMainPic').html('<img src="'+artistObjects[index].images[0].url+'" alt="" />');

      $.getJSON(similarArtURL, function(data) {
          console.log(data);
          var similarArtData = data.artists;
          for (var i = 0; i < similarArtData.length; i++) {
            var dataItems = similarArtData[i].name;
            $('.thumbnailsList').append('<li>'+dataItems+'</li>');
          }
      });
    });
  });
};

$(document).ready(function() {
  $('input[type=text]').keyup(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      var searchValue = $('#artistName').val();
      searchResults(searchValue);
      $('#artistName').val('');
    };
  });

  searchButton.onclick = function(event) {
    event.preventDefault();
    var searchValue = $('#artistName').val();
    searchResults(searchValue);
    $('#artistName').val('');
  }
});
