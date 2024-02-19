// variables

const movies = document.querySelector('.movies')
const search = document.querySelector('.search')
const movie = document.querySelector('.movie')
const popup = document.querySelector('.pop-up')
const imgmovie = document.querySelector('.img-movie')


// intégrer des plugin

// pour afficher par défaut une cattégorie on le met avec l'argument
function myFetch (categorie = "top_rated"){
  fetch(`https://api.themoviedb.org/3/tv/${categorie}?api_key=6631e5f1dc96088e0d26b86da29b5b6a&page=1`) 

    .then(response => response.json()) 

    .then(data => { 
      console.log(data);
      for(let i=0; i<data.results.length; i++ ){
        movies.innerHTML += `
      <div class="movie" data-index="${i}">
                <h4>${data.results[i].name}</h4>
                <div class="img-movie">
                <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="">
                <div class="popularity">Popularité ${parseInt(data.results[i].vote_average)}/10 </div>
                </div>
                
                
      </div>
      `
      } 

      // pour ouvrir le popup

      movies.addEventListener('click', function(e){
        // atttention, on uttilise closest car les enfants movie viennent par dessus et donc ça ne fonctionnait pas
        if(e.target.closest('.movie').classList.contains('movie')){
          popup.innerHTML = ""
          // je créé une variable pour récup le data
          // dataset = pour viser le "data-index" que j'ai créé
          // ATTENTION tous les "index" qui suivent sont la variable que j'ai créé
          let index = e.target.closest('.movie').dataset.index 
          popup.classList.add('active')
          popup.innerHTML += `
          <img src="https://image.tmdb.org/t/p/w500${data.results[index].poster_path}" alt="">
                <div>
                <p>${data.results[index].name}</p>
                <p>${data.results[index].overview}</p>
                <p>Note moyenne : ${parseInt(data.results[index].vote_average)}/10</p>
                </div>
                <a class="close" href="#">❌</a>
          `
        }

        // pour fermer le popup

        const close_popup = document.querySelector('.close')
        close_popup.addEventListener('click', function(){
        popup.innerHTML = ""
        popup.classList.remove('active')
      })
      
      })



  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error); 
  })
}

// on lance la fonction dès lke depart qui est réglé sur top rated dans la fonction

myFetch()

search.addEventListener('click', function(e){
   movies.innerHTML = ""
  if(e.target.hasAttribute('data-categorie')){
    myFetch(e.target.dataset.categorie)
 // on vérifie si l'élément clické a la classe active, on le retire
    if(e.target.classList.contains('active')){
      // si la réponse est true :
        // toggle enlève si elle est là, met si elle n'est pas là
      e.target.classList.toggle('active')
       // si l'élément clické n'a pas la classe active, on l'ajoute'
    }else{
      // on doit vérifier si un autre enfant a la classe Active, on doit le retirer
      if(search.querySelector('.active')){
        search.querySelector('.active').classList.remove('active')
        e.target.classList.add('active')
        // si un des enfants ,'a pas la clase active, on l'ajoute
      }else{
        e.target.classList.toggle('active')
      }
      
    }
    
  }
})

