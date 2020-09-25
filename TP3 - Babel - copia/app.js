const Carrusel = document.getElementById('carrusel')

const MoviesJSON = async() => {
    const apikey = '0ad1546a702e1e528140a468df39e48a';
    const peticion = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}`);
    const data = await peticion.json();
    data.results.forEach(element => {
        let auxCast = '';
        ObtenerElenco(element.id, apikey).then(Casting =>{
            for (let index = 0; index < 4; index++) {
                auxCast += (`<tr><td>${Casting.cast[index].character}</td><td>${Casting.cast[index].name}</td></tr>`);
            }
            GenerarTarjeta(element.poster_path,element.title,element.vote_average,element.overview,auxCast);
        }).catch(() => {
            console.log('Algo salió mal, tarjeta no generada.');
        });
    });
    setTimeout(() => {
        var elems = document.querySelector('.carousel');
        var options = {fullWidth: true, indicators: false, padding: 50 };
        var instances = M.Carousel.init(elems, options);
    }, 2000);
};

function ObtenerElenco(movieId, apikey) {
    return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`);
    req.onload = function() {
        if (req.status == 200) {
            resolve(JSON.parse(req.response));
        }
        else {
            reject();
        }
    };
        req.send();
    })
};

const API = 'https://api.themoviedb.org/3/';
const apikey = '?api_key=0ad1546a702e1e528140a468df39e48a';

const getMovies = async () => {
    const dataType = 'discover/movie'
    const apiURL = `${API}${dataType}${apikey}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Fetch Error..!!', error);
    };
};

const getCasting = async (movieId) => {
    const dataType = `movie/${movieId}/credits`
    const apiURL = `${API}${dataType}${apikey}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Fetch Error..!!', error);
    };
};

function getCard (ImgSrc,Title,Score,Descrition,Casting,CastingLength) {
    let Card = 
        `<div class="card small">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="https://image.tmdb.org/t/p/w220_and_h330_face${ImgSrc}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-0">${Title}<i class="material-icons right"></i></span>
                <p><a href="#">Visitar web</a></p>
            </div>
            <div class="card-reveal">
            <span class="card-title grey-text text-darken-4"><b>${Title}</b><i class="material-icons right">x</i></span>
                <div class="row">
                    <div class="col s6"><b>Puntaje:</b> ${Score}</div>
                    <div class="col s6"></div>
                </div>
                                
                <ul class="collapsible">
                    <li>
                        <div class="collapsible-header">
                            <i class="material-icons">filter_drama</i>
                            Sinopsis
                        </div>
                        <div class="collapsible-body"><p>${Descrition}</p></div>
                    </li>
                    <li>
                        <div class="collapsible-header">
                            <i class="material-icons">place</i>
                            Actores
                            <span class="new badge" data-badge-caption="personajes">${CastingLength}</span></div>
                        <div class="collapsible-body">
                            <table class="responsive-table">
                                <thead>
                                    <tr>
                                        <th>Personaje:</th>
                                        <th>Actor:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Casting}
                                </tbody>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
        </div>`;
    return Card;
};

const getAllCards = async () => {
    const movies = await getMovies(); //Esto obtiene las peliculas.
    let cards = ''; 
    movies.results.map (async (element) => {  //ForEach de cada pelicula.
        let casting = await getCasting(element.id); //Obtenemos el elenco de una pelicula.
        let htmlCasting = '';    //Inicializamos una var vacia.
        casting = casting.cast;     //Almacenamos solo el eleneco.
        casting.map (Element => { //Por cada actor en el elenco.
            htmlCasting += `<tr><td>${Element.character}</td><td>${Element.name}</td></tr>`; //Generamos un html de actor y personaje.
        });
        cards += (getCard(element.poster_path,element.title,element.vote_average,element.overview,htmlCasting,casting.length));
        //Generamos y almacenamos la tarjeta de una peli y su elenco y la guaramos en un array
    })
    setTimeout(() => {
        console.log(cards)
    }, 8000);
}
const createView = async () => {
    let cards = await getAllCards()
    console.log(cards)
}

createView();