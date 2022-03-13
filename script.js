const apiKey = 'api_key=74207837693808ec992c37ac2edfd112';
const baseUrl = 'https://api.themoviedb.org/3';
const apiUrl = baseUrl+"/discover/movie?sort_by=popularity.desc&"+apiKey;
const imageUrl = "https://image.tmdb.org/t/p/original";
console.log(apiUrl);
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchUrl = baseUrl+'/search/movie?'+apiKey;
const tagsElement = document.getElementById('tags');
const genres = [
    {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 14,
        "name": "Fantasy"
        },
        {
        "id": 36,
        "name": "History"
        },
        {
        "id": 27,
        "name": "Horror"
        },
        {
        "id": 10402,
        "name": "Music"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Science Fiction"
        },
        {
        "id": 10770,
        "name": "TV Movie"
        },
        {
        "id": 53,
        "name": "Thriller"
        },
        {
        "id": 10752,
        "name": "War"
        },
        {
        "id": 37,
        "name": "Western"
        }
]
var selectorGenre = [];
setTags();
//function to set tags from api
function setTags(){
    tagsElement.innerHTML = '';
    genres.forEach(genre=>{
        const t=document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        tagsElement.append(t);
        t.addEventListener('click',()=>{
            if(selectorGenre.length == 0){
                selectorGenre.push(genre.id);
            }else{
                if(selectorGenre.includes(genre.id)){
                    selectorGenre.forEach((id,idx)=>{
                        if(id==genre.id){
                            selectorGenre.splice(idx,1);
                        }
                    })
                }else{
                    selectorGenre.push(genre.id);
                }
            }
            console.log(selectorGenre);
            getMovies(apiUrl+'&with_genres='+encodeURI(selectorGenre.join(',')));
            highlightSelection();
        })
    })
}

function highlightSelection(){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('active');
    })
    if(selectorGenre.length!=0){
        selectorGenre.forEach(id=>{
                const highlightedTag = document.getElementById(id);
                highlightedTag.classList.add('active');
        })
    }

}
// function to get movies
getMovies(apiUrl);
function getMovies(url){

    fetch(url).then(res=>res.json()).then(data=>{
        if(data.results.length!==0){
            showMovies(data.results);
        }
        else{
            main.innerHTML = `<h1 class="results">No Results Found</h1>`
        }
    })

}

function showMovies(data){
    main.innerHTML = '';
    data.forEach(movie=>{
        const {title,poster_path,vote_average,overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
        <img src="${poster_path?imageUrl+poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}" />

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
          ${overview}
        </div>

        `
        main.appendChild(movieElement);
    })
}
 //Function change color of rate
function getColor(vote){
    if(vote>= 8){
        return 'green'
    }
    else if(vote>=5){
        return 'orange'
    }
    else
    return 'red'
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchUrl+'&query='+searchTerm);
    }
    else(
        getMovies(apiUrl)
    )
})