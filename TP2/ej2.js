
// Ejercicio 2: API Last FM

const getJSON = async() => {
    const apiKey = "2c3803233cc6bb2b28ce348374fd5dc9";
    const max = "&limit=10"
    const peticion = await fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key='+apiKey+'&format=json'+max);
    const data = await peticion.json(); 
    let tabla = document.getElementById('TopArtistas')
    data.artists.artist.forEach(element => {
        tabla.innerHTML += ('<tr><td>'+element.name+'</td><td>'+element.playcount+'<td>'+element.listeners+'</td></tr>');
    });
};
