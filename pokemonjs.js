/*                
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
                        alt="">
                    <div class="escojer-forma">
                        <span class="forma-normal">forma normal</span>
                        <span class="forma-shiny">forma shiny</span>
                    </div>
               

                
                    <p class="descripcion">Cuando varios de estos POKéMON se juntan, su electricidad puede acumularse y
                        causar tormentas
                        eléctricas.</p>

                    <div class="datos">
                        <div class="div-datos">
                            <p>Altura</p>
                            <p>0.4 m</p>
                        </div>
                        <div class="div-datos">
                            <p>Peso</p>
                            <p>6.0 kg</p>
                        </div>
                        <div class="div-datos">
                            <p>Sexo</p>
                            <p>♂ 50% ♀ 50%</p>
                        </div>
                        <div class="div-datos">
                            <p>categoria</p>
                            <p>semilla</p>
                        </div>
                        <div class="div-datos">
                            <p>habilidad</p>
                            <p>espuma</p>
                        </div>



                    </div>
            */

const pokemon = window.location.search.split('=')[1];
const imagenPokemon = document.querySelector('.imagen-pokemon-d');
const infoPokemon = document.querySelector('.info-pokemon');
const datos = document.querySelector('.datos');
const descripcion = document.querySelector('.descripcion');
const nombrePokemon = document.querySelector('.nombre-pokemon');
var ctx = document.getElementById('myChart').getContext('2d');
let pokemonData = {}; // Variable para almacenar datos del Pokémon
console.log(pokemon);

// Función para obtener los datos del Pokémon
function obtenerPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            pokemonData = data; // Guarda los datos en la variable global
            imagenP(data);     // Usa los datos en la función imagenP
            grafica(data);     // Ahora pasamos los datos a la función grafica
        })
        .catch(error => console.error('Error:', error));
}

// Llama a la función obtenerPokemon
obtenerPokemon(pokemon);

// Función para mostrar la imagen y detalles
function imagenP(data) {
    imagenPokemon.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}">
                        <div class="escojer-forma">
                            <span class="forma-normal">forma normal</span>
                            <span class="forma-shiny">forma shiny</span>
                        </div>`;

    // Llama a otra API para obtener más información
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(response => response.json())
        .then(data => infoP(data));

    // Convierte peso y altura
    const hectagramos = data.weight;
    const decimetros = data.height;

    const kilogramos = hectagramos / 10;
    const metros = decimetros / 10;

    nombrePokemon.textContent = data.name;

    // Muestra información
    datos.innerHTML = ` 
                            <div class="div-datos">
                                <p>Altura</p>
                                <p>${metros} m</p>
                            </div>
                            <div class="div-datos">
                                <p>Peso</p>
                                <p>${kilogramos} kg</p>
                            </div>
                            <div class="div-datos">
                                <p>Sexo</p>
                                <p>♂ 50% ♀ 50%</p>
                            </div>
                            <div class="div-datos">
                                <p>categoria</p>
                                <p>semilla</p>
                            </div>
                            <div class="div-datos">
                                <p>habilidad</p>
                                <p>espuma</p>
                            </div>`;
}

function infoP(params) {
    const texto = params.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text;
    descripcion.textContent = texto;
}

function grafica(data) {

    let stats = data.stats.map(stat => stat.base_stat);


    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'],
            datasets: [{
                label: 'Estadísticas Base',
                data: stats, // Usa las estadísticas obtenidas
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scale: {
                angleLines: {
                    display: true
                },
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 150
                }
            }
        }
    });
}

fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            const evolutionUrl = data.evolution_chain.url; // URL de evolución
            console.log("URL de evolución:", evolutionUrl);

            // 2. Obtener la cadena de evolución
            fetch(evolutionUrl)
                .then(response => response.json())
                .then(data => evoluciones(data.chain)) // Procesar la cadena
                .catch(error => console.error('Error en la cadena de evolución:', error));
        })
        .catch(error => console.error('Error en la especie:', error));

function evoluciones(data) {

    console.log(data.evolution_chain.url);
}
