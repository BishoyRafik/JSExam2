//api_key=eba8b9a7199efdcb0ca1f96879b83c44  >>api key
var links = $('a.navlinks');
var toggler = $('.navtoggler');
var navcontent = $('.nav-content');
var closer = $('.fa-close');
var bars = $('.fa-bars');
var search = document.getElementById('searchBar');
var SerMovie;
var movies =[];
toggler.click(function(){
    let navwidth = navcontent.outerWidth();
    let toggelLeft = toggler.css('left')
    console.log(navwidth);
    if(toggelLeft == '0px'){//open 
        $('.navbody').show("slide", { direction: "right" }, 1000);
        // $('.navlinks').slideUp(500);
        navcontent.animate({ left: `${navwidth + toggelLeft}`}, 500);    
        toggler.animate({ left: `${navwidth}`}, 500);
        bars.addClass('d-none');
        closer.removeClass('d-none');
    }else{ // close
        $('.navbody').show("slide", { direction: "left" }, 1000);
        navcontent.animate({ left: `0px`}, 500);
        toggler.animate({ left: `0%`}, 500);
        closer.addClass('d-none');
        bars.removeClass('d-none');
    }
})

async function getMovies(){
    var request = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`
    );
    request = await request.json();
    movies = request.results;
    console.log(request);
    console.log(movies);
    displayMovies();
    search.addEventListener('keyup', function(){
        searchMov();
    })
}

async function searchMov(){
    if (search.value == ""){
        getMovies();
    }else{
        SerMovie = search.value;
        var request = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${SerMovie}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`
        );
        request = await request.json();
        movies = request.results;
        console.log(request);
        console.log(movies);
        displayMovies();
    }
}

function displayMovies(){
    var container =``;
    for(let i = 0; i<movies.length; i++){
        container += `
        <div class="col-lg-4">
        <div class="movie rounded-2 position-relative overflow-hidden">
        <div class="cardImage">
            <img src='https://image.tmdb.org/t/p/w500${movies[i].poster_path}' class="img-fluid" alt="">
        </div>
            <div class="hover rounded-2 d-flex flex-column justify-content-start">
                <div class="hoverTxt p-3">
                    <h2 class="movie-title text-center">${movies[i].title}</h2>
                    <p class ='desc'>${movies[i].overview.split('').slice(0,250).join('')}</p>
                    <p class="date text-capitalize">release date : ${movies[i].release_date}</p>
                    <p class="rate text-capitalize">rating</p>
                    <p class="rating rounded-pill">${movies[i].vote_average.toString().split('').slice(0,3).join('')}</p>
                </div>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById('showmovies').innerHTML = container;
}

getMovies();