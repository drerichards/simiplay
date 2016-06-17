var searchButton = document.getElementById('searchButton');
var searchResults = function(searchValue) {
  $('.artistMainPic img').remove();
  $('#tracksContainer').css("visibility","hidden");
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
      var simiArtURL = 'https://api.spotify.com/v1/artists/'+artistID+'/related-artists';
      $('li').toggle(600);
      $('.artistMainPic').html('<img src="'+artistObjects[index].images[1].url+'" />');

      $.getJSON(simiArtURL, function(data) {
          console.log(data);
          var simiArtData = data.artists;
          for (var i = 0; i < simiArtData.length; i++) {
            var simiArtPic = simiArtData[i].images[1].url;
            $('.thumbnailsList').append('<li><img src="'+simiArtPic+'" /></li>');
          }
          $('li').click(function(event) {
            event.preventDefault();
            var index = $(this).index();
            var simiArtID = simiArtData[index].id;
            var tracksTitle = $('.tracksTitle');
            $('#tracksContainer').css("visibility","visible");
            $('.trackList li').remove();
            $('.songPic img').remove();
            tracksTitle.val('');
            tracksTitle.html('Top 10 Tracks for: <strong>'+simiArtData[index].name+'</strong>');
            var topTracksURL = 'https://api.spotify.com/v1/artists/'+simiArtID+'/top-tracks?country=SE'

              $.getJSON(topTracksURL, function(data) {
                console.log(data);
                var topTrackData = data.tracks;
                for (var i = 0; i < topTrackData.length; i++) {
                  var track = topTrackData[i].name;
                  $('.trackList').append('<li><div class="songBar">'+track+'</div></li>');
                }
                var playBtn = ('<input class="play" type="button" value="Play" />');
                var pauseBtn = ('<input class="pause" type="button" value="Pause" />');
                $('.songPic').html('<img src="'+topTrackData[0].album.images[0].url+'" />'+playBtn+pauseBtn);

                function playAudio(index) {
                  var audio = new Audio(topTrackData[index].preview_url);
                  audio.play();

                  $('li, .pause').click(function (event) {
                    event.preventDefault();
                    audio.pause();

                    $('.play').click(function (event) {
                      event.preventDefault();
                      audio.play();
                    });                  
                  });
                }
                playAudio(0);

                $('.trackList li').click(function() {
                  var index = $(this).index();
                  $('.songPic img').remove();
                  $('.songPic').html('<img src="'+topTrackData[index].album.images[0].url+'" />'+playBtn+pauseBtn);
                  playAudio(index);
                });
              });
          });
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
