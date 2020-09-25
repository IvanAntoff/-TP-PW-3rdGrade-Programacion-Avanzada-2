const API = 'https://api.themoviedb.org/3/';
const apikey = '?api_key=0ad1546a702e1e528140a468df39e48a';

const getMovies = async () => {
    const dataType = 'discover/movie'
    const apiURL = `${API}${dataType}${apikey}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data)
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

function getCard (ImgSrc,Title,Score,ReleaseDate,Descrition,Casting,CastingLength) {
    let Card = 
        `<div class="card medium item">
            <div class="card-image">
                <img class="activator" src="https://image.tmdb.org/t/p/w200${ImgSrc}">
            </div>
            <div class="card-content">
                <span class="card-title activator black-text text-darken-4"><b>${Title}</b><i class="material-icons right">arrow_drop_up</i></span>
                <p class="activator">${Descrition.slice(0,40)} . . .</p>
            </div>
            <div class="card-reveal">
            <span class="card-title center-align grey-text text-darken-4"><b>${Title}</b><i class="material-icons right">arrow_drop_down</i></span>
                <div class="row" style="padding-top:15px">
                    <div class="col s5 center-align"><b>Puntaje: </b>${Score}</div>
                    <div class="col s7 left-align"><b>Estreno: </b>${ReleaseDate}</div>
                </div>
                <ul class="collapsible">
                    <li>
                        <div class="collapsible-header">
                            Sinopsis
                        </div>
                        <div class="collapsible-body"><p>${Descrition}</p></div>
                    </li>
                    <li>
                        <div class="collapsible-header">
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
    for (let i = 0; i < movies.results.length; i++) {
        let element = movies.results[i];
        let casting = await getCasting(element.id);
        let cast = casting.cast;
        let htmlCasting = '';
        for (let i = 0; i < cast.length; i++)
            htmlCasting += `<tr><td>${cast[i].character}</td><td>${cast[i].name}</td></tr>`;
        cards += getCard(element.poster_path,element.title,element.vote_average,element.release_date,element.overview,htmlCasting,cast.length
        );
    }
    return cards;
};

export default getAllCards;