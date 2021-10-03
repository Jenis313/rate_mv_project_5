// alert(movieId)

const baseURL = 'https://api.themoviedb.org/3';
const api_key = 'api_key=9bce0ffddad7eff5494312922fd55dd9';
const imageURL = 'https://image.tmdb.org/t/p/original';
// Get all required movie details for this id
$.ajax(`${baseURL}/movie/${movieId}?${api_key}&language=en-US`)
    .then((movie) => {
        // console.log('movie details -->', movie);

        // set movie poster
        $('.movie-dp>img').attr('src', `${imageURL}/${movie.poster_path}`)

        // set title and year
        const movieYear = movie.release_date.split("-")[0];
        $('.movie-descript-heading>h1').html(`${movie.original_title} <span> ${movieYear}</span>`);

        // Work on reviews here
        $.getJSON(`/movie/rating-score/${movieId}`, (data) => {
            // This hits the url in localhost not in tmdb and gets data from local our own backend
            $('.movie-avg-score').text(data.average_rating);
            $('.movie-score-counts').text(data.total_reviews)
        })
        // Rate movie
        // const stars = $('.rating-stars i');
        // console.log('stars ---> ', stars);
        document.querySelectorAll('.rating-stars i').forEach((star, index) => {
            star.addEventListener('click', () => {
                $.post( `/movie/${movieId}`, { 
                    userId : userId,
                    movieId: movieId,
                    score: index+1
                } );
                $('.your-review-score').empty();
                $('.your-review-score').html(`<p class="rate-movie">You rated <span>${index+1}</span>  stars.</p>`)
                
            })
          })

        // Set overview
        $('.movie-summary>p').text(`${movie.overview}`);

        // Set movie images
        $.ajax(`${baseURL}/movie/${movieId}/images?${api_key}&language=en-US&append_to_response=images&include_image_language=en,null`)
        .then((data) => {
            const images = data.backdrops;
            console.log(images)
            for(let i = 0; i < 4; i++){
                $('.movie-images-inner').append(`
                <div class="movie-image-single">
                    <a href="#"><img src='${imageURL}/${images[i].file_path}' alt=''></a>
                </div>
                `)
            }
        })

        // Set credits
        $.ajax(`${baseURL}/movie/${movieId}/credits?${api_key}&language=en-US`)
        .then((data) => {
            // set casts
            const casts = data.cast;
            for(let i = 0; i < 5; i++){
                $('.movie-casts-inner').append(`
                <div class="single-movie-cast">
                    <img src="${imageURL}/${casts[i].profile_path}" alt="">
                    <a class="movie-cast" href="https://www.google.com/search?q=${casts[i].original_name}">${casts[i].original_name}</a>
                </div>
                `)
            }

            // set crews
            const crews = data.crew;
            const directors = crews.filter((person) => {
                return person.department == 'Directing';
            }) 
            const writers = crews.filter((person) => {
                return person.department == 'Writing';
            }) 
            // console.log('writers--> ', writers);
            directors.forEach((director) => {
                $('.director').append(`<p>${director.name}</p>`)
            })
            writers.forEach((writer) => {
                $('.writer').append(`<p>${writer.name}</p>`)
            })
        })
        
        // Set date and runtime
        $('.release-date').append(`<p>${movie.release_date}</p>`)
        $('.runtime').append(`<p>${movie.runtime} mins</p>`)
    })