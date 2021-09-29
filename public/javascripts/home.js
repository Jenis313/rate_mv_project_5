const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=9bce0ffddad7eff5494312922fd55dd9';

// Request for feature movies section
$.ajax(`${base_URL}/trending/movie/day${api_key}`)
    .then((data) => {
       createDivs(data, 4)
    })

// Request for display movies section 
$.ajax(`${base_URL}/movie/popular${api_key}`)
    .then((data) => {
        createDivs(data, 20)
    })

// Listen on search button
$( "#movie-search" ).submit(function( event ) {
    let movieFilter = $("#movie-filter").val();
    let movieSearch = $("#movie-search-input").val();
    displayResult(movieSearch, movieFilter);
    event.preventDefault();
  });

// Request api and display results based on search/NOsearch
function displayResult(movieSearch, movieFilter){
    if(movieSearch){
        $('.feature-movies').empty();
        $('.movies-list').empty();
        $('#movies-by-gerne').text('Search results:')
        $.ajax(`${base_URL}/search/movie${api_key}&language=en-US&page=1&include_adult=false&query=${movieSearch}`)
        .then((data) => {
            createDivs(data, 20)
        })
        
    }else if(movieFilter){
        $('.feature-movies').empty();
        $('.movies-list').empty();
        $('#movies-by-gerne').text('Search results:')
        $.ajax(`${base_URL}/discover/movie${api_key}&with_genres=${movieFilter}`)
        .then((data) => {
            createDivs(data, 20)
        })

    }else{
        $('.movies-list').empty();
        $.ajax(`${base_URL}/movie/popular${api_key}`)
        .then((data) => {
            createDivs(data, 20)
        })
    }
}

// It creates movie div(component) and if the loopTimes is less than 4 that means divs should be appended inside feature section
function createDivs(data, loopTimes){
    // console.log(data.results);
    let movies = data.results;

    let movieDiv = "<div class = 'movie'>"
    if(loopTimes>4){
        movieDiv = "<div class = 'movie secondary-movie'>"
    }

    for(let i=0; i<loopTimes; i++){
        // console.log(movies[i].original_title);

        // Get rating from db
        let currentMovieAverageRating = 0;
        $.getJSON(`/movie/rating-score/${movies[i].id}`, (data) => {
            // This hits the url in localhost not in tmdb and gets data from local our own backend
            if(!data.average_rating){
                currentMovieAverageRating = 0;
            }else{
                currentMovieAverageRating = data.average_rating;
            }
            let newMovie = $(movieDiv)
            newMovie.append(`
            <div class = 'movie-img'>    
                <a href = '#'>
                    <img src = 'https://image.tmdb.org/t/p/original/${movies[i].poster_path}'>
                </a>
            </div>
            <div class="movie-details">
                <h3><a href="/movie/${movies[i].id}">${movies[i].original_title}</a></h3>
                <p><i class="fas fa-star"></i> <span>${currentMovieAverageRating}</span>/10</p>
            </div>
            `)
            if(loopTimes>4){
                $('.movies-list').append(newMovie)
            }else{
                $('.movie-container-main').append(newMovie)
            }
        })
    }
}