const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=9bce0ffddad7eff5494312922fd55dd9';

$.ajax(`${base_URL}/trending/movie/day${api_key}`)
    .then((data) => {
        // console.log(data.results);
        let movies = data.results;

        for(let i=0; i<4; i++){
            // console.log(movies[i].original_title);

            // Get rating from db
            let currentMovieRatings = 0;
            if(Math.random() > .5){
                currentMovieRatings = 7;
            }

            let newMovie = $("<div class = 'movie'>")
            newMovie.append(`
            <div class = 'movie-img'>    
                <a href = '#'>
                    <img src = 'https://image.tmdb.org/t/p/original/${movies[i].poster_path}'>
                </a>
            </div>
            <div class="movie-details">
                <h3><a href="/movie/${movies[i].id}">${movies[i].original_title}</a></h3>
                <p><i class="fas fa-star"></i> <span>${currentMovieRatings}</span></p>
            </div>
            `)
            $('.movie-container-main').append(newMovie)
        }
    })

$.ajax(`${base_URL}/movie/popular${api_key}`)
    .then((data) => {
        console.log(data.results);
        let movies = data.results;
        for(let i=0; i<20; i++){
            console.log(movies[i].original_title);
            let newMovie = $("<div class = 'movie secondary-movie'>")
            newMovie.append(`
                        <div class='movie-img'>
                            <a href='/movie/${movies[i].id}'>
                                <img src='https://image.tmdb.org/t/p/original/${movies[i].poster_path}' alt=''>

                            </a>
                        </div>
                        <div class='movie-hover'>
                            <a href='#'>Details</a>
                        </div>
                        <div class='movie-details'>
                            <h3><a href='/movie/${movies[i].id}'>${movies[i].original_title}</a></h3>
                            <p><i class='fas fa-star'></i> <span>4.6</span></p>
                        </div>
            `)
            $('.movies-list').append(newMovie)
        }
    })

let movieSearchInput = '';
let movieFilterInput = '';

$( "#movie-search" ).submit(function( event ) {
    let movieFilter = $("#movie-filter").val();
    let movieSearch = $("#movie-search-input").val();
    displayResult(movieSearch, movieFilter);
    event.preventDefault();
  });

function displayResult(movieSearch, movieFilter){
    if(movieSearch){
        $('.movies-list').empty();
        $.ajax(`${base_URL}/search/movie${api_key}&language=en-US&page=1&include_adult=false&query=${movieSearch}`)
        .then((data) => {
            console.log(data.results);
            let movies = data.results;
            for(let i=0; i<20; i++){
                console.log(movies[i].original_title);
                let newMovie = $("<div class = 'movie secondary-movie'>")
                newMovie.append(`
                            <div class='movie-img'>
                                <a href='/movie/${movies[i].id}'>
                                    <img src='https://image.tmdb.org/t/p/original/${movies[i].poster_path}' alt=''>
    
                                </a>
                            </div>
                            <div class='movie-hover'>
                                <a href='#'>Details</a>
                            </div>
                            <div class='movie-details'>
                                <h3><a href='/movie/${movies[i].id}'>${movies[i].original_title}</a></h3>
                                <p><i class='fas fa-star'></i> <span>4.6</span></p>
                            </div>
                `)
                $('.movies-list').append(newMovie)
            }
        })
        
    }else if(movieFilter){
        $('.movies-list').empty();
        $.ajax(`${base_URL}/discover/movie${api_key}&with_genres=${movieFilter}`)
        .then((data) => {
            console.log(data.results);
            let movies = data.results;
            for(let i=0; i<20; i++){
                console.log(movies[i].original_title);
                let newMovie = $("<div class = 'movie secondary-movie'>")
                newMovie.append(`
                            <div class='movie-img'>
                                <a href='/movie/${movies[i].id}'>
                                    <img src='https://image.tmdb.org/t/p/original/${movies[i].poster_path}' alt=''>
    
                                </a>
                            </div>
                            <div class='movie-hover'>
                                <a href='#'>Details</a>
                            </div>
                            <div class='movie-details'>
                                <h3><a href='/movie/${movies[i].id}'>${movies[i].original_title}</a></h3>
                                <p><i class='fas fa-star'></i> <span>4.6</span></p>
                            </div>
                `)
                $('.movies-list').append(newMovie)
            }
        })

    }else{
        $('.movies-list').empty();
        $.ajax(`${base_URL}/movie/popular${api_key}`)
        .then((data) => {
            console.log(data.results);
            let movies = data.results;
            for(let i=0; i<20; i++){
                console.log(movies[i].original_title);
                let newMovie = $("<div class = 'movie secondary-movie'>")
                newMovie.append(`
                            <div class='movie-img'>
                                <a href='/movie/${movies[i].id}'>
                                    <img src='https://image.tmdb.org/t/p/original/${movies[i].poster_path}' alt=''>

                                </a>
                            </div>
                            <div class='movie-hover'>
                                <a href='#'>Details</a>
                            </div>
                            <div class='movie-details'>
                                <h3><a href='/movie/${movies[i].id}'>${movies[i].original_title}</a></h3>
                                <p><i class='fas fa-star'></i> <span>4.6</span></p>
                            </div>
                `)
                $('.movies-list').append(newMovie)
            }
        })
    }
}