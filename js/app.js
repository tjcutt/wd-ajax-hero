(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE



  $('button').click(function(e) {
    e.preventDefault();

    let searchVal = $('#search').val()

    if (searchVal.length === 0) {
      Materialize.toast('Please enter a keyword into the search', 3000)
    }

    $.ajax({
      method: 'GET',
      url: `http://omdbapi.com/?s=${searchVal}`,
      dataType: 'json',
      success: (movieObj) => {
        movies = []
        let movieArr = movieObj['Search']

        for (let movie of movieArr) {
          let movieInfo = {
            poster: movie['Poster'],
            title: movie['Title'],
            year: movie['Year'],
            id: movie['imdbID']
          }
          movies.push(movieInfo)
        }
        renderMovies()
      },
      error:
      console.log('OMDB API call error')
    })
  })
})();
