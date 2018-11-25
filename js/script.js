$(document).ready(function(){ /*start j query from here*/
    $("#searchForm").on("submit",function(e){
      let searchText=$("#searchText").val();/*here value of input stored in searchtext variable*/
        getMovies(searchText);/*creat a function and pass variable*/
        e.preventDefault();    
        });
});
/*initilize a function*/
function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?apikey=3badf988&s='+searchText)  /*pass api url into get function*/
.then(function(response){
        let movies=response.data.Search;
        let output=" "; 
        $.each(movies,(index,movie)=>{
        output +=`
        <div class="col-lg-3">
            <div class="well text-center">
                <img src="${movie.Poster}" class="img-thumbnail"/>
                <h5>${movie.Title}</h5>
                <h5>${movie.Title}</h5>
                <a class="btn btn-primary" href="#" onclick="selectedMovie('${movie.imdbID}')">Movie Details</a>
            </div>
        </div>
`;
        $("#movies").html(output);
    });
  })
  .catch(function(error){
    console.log(error);
  }); 
};
function selectedMovie(id){
    sessionStorage.setItem("movieId",id);
    window.location="movDetails.html";
    return false;
}

function getMovieDetails(){
    let id=sessionStorage.getItem("movieId");
    axios.get('http://www.omdbapi.com/?apikey=3badf988&i='+id)
  .then(function(response) {
    let details=response.data;
    let output=" ";
    output=`<div class="row">
        <div class="col-md-4">
                <img src="${details.Poster}" class="img-thumbnail"/>
        </div>
    <div class="col-md-8">
<h3>${details.Title}</h3>
<ul class="list-group">
<li class="list-group-item"><strong>Genre :</strong>${details.Genre}</li>
<li class="list-group-item"><strong>IMDB Rating :</strong>${details.Rated}</li>
<li class="list-group-item"><strong>Released :</strong>${details.Released}</li>
<li class="list-group-item"><strong>Cast :</strong>${details.Actors}</li>
<li class="list-group-item"><strong>Writer :</strong>${details.Writer}</li>
<li class="list-group-item"><strong>Director :</strong>${details.Director}</li>
<li class="list-group-item"><strong>IMDB Votres :</strong>${details.imdbVotes}</li>
<li class="list-group-item"><strong>Production :</strong>${details.Production}</li>
<li class="list-group-item"><strong>Awards :</strong>${details.Awards}</li>
<li class="list-group-item"><strong>Language :</strong>${details.Language}</li>
</ul>
    </div>
        </div>
<div class="row well">
<h3>Plot<?h3>
${details.Plot}
<hr>
<a class="btn btn-primary" href="http://www.imdb.com/title/${details.imdbID}">IMDB</a>
<a class="btn btn-default" href="index.html">HOME</a>
</div>
`;
        
        $("#movDetails").html(output);
  })
  .catch(function (error) {
    console.log(error);
  });
}