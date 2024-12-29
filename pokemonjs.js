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
let pokemonData = {}; 
let imagen = '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemon+'.png'


function obtenerPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            pokemonData = data; 
            imagenP(data);    
            grafica(data); 
            dibtipos(data) 
            
        })
        .catch(error => console.error('Error:', error));
}

function evolucionesget(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
     
            
        })
        .catch(error => console.error('Error:', error));
}

//  llamar función obtenerPokemon
obtenerPokemon(pokemon);


async function debilidades(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    const types = data.types.map(t => t.type.url);
  
    let weaknesses = [];
    for (const typeUrl of types) {
      const typeData = await fetch(typeUrl).then(res => res.json());
      weaknesses.push(...typeData.damage_relations.double_damage_from.map(t => t.name));
    }
  
    const uniqueWeaknesses = [...new Set(weaknesses)];
    
    // Llamada a otra función para procesar los datos obtenidos
    dibujarDebilidades(pokemon, uniqueWeaknesses);
  }
  
  // Segunda función que recibe los datos obtenidos
  function dibujarDebilidades(pokemon, weaknesses) {

         const span = document.createElement('span');
         const div = document.querySelector('.debilidades-tipos');
        for (const weakness of weaknesses) {
            const span = document.createElement('span');
            span.textContent = weakness;
            span.classList.add('tipo-' + weakness);
            div.appendChild(span);
        }
    // Aquí puedes hacer cualquier otra acción, como mostrar en el DOM}
  }
  
  // Llamada inicial
 
  
  



// Función para mostrar la imagen y detalles
function imagenP(data) {

    let imgElement = document.querySelector('#pokemon-image');
    if (!imgElement) {
        imgElement = document.createElement('img');
        imgElement.id = 'pokemon-image';
        imagenPokemon.appendChild(imgElement);
    }

    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    imgElement.alt = data.name;

    const kilogramos = data.weight / 10;
    const metros = data.height / 10;


    nombrePokemon.textContent = data.name;


    const formaShiny = document.querySelector('.forma-shiny');
    formaShiny.addEventListener('click', () => {
        imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${data.id}.png`;
    });

    const formaNormal = document.querySelector('.forma-normal');
    formaNormal.addEventListener('click', () =>{
        imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    })

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
            <p>Categoría</p>
            <p>Semilla</p>
        </div>
        <div class="div-datos">
            <p>Habilidad</p>
            <p>Espuma</p>
        </div>`;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(response => response.json())
        .then(data => infoP(data));

        data.types.forEach(type => {
            fetch(`https://pokeapi.co/api/v2/type/${type.type.name}`)
            .then(response => response.json())
            .then(data => data);
        });

       
}


// Función para cambiar pokemon a shainy 




function infoP(params) {
    const texto = params.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text;

    descripcion.textContent = texto;
}




debilidades(pokemon);
function dibtipos(data) {

    const pokemon = data.name;



    const tipos = data.types.map(type => type.type.name);

    const tipo1 = tipos[0];
    const tipo2 = tipos[1];

                  
    const divTipos = document.querySelector('.todos-tipos');

    tipos.forEach(resulttipos => {
        const span = document.createElement('p');
        span.classList.add('tipo-' + resulttipos);
        span.textContent = resulttipos;
        divTipos.appendChild(span);

    });

   
   



  
}



  



di();
function di() {


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
                .then(data => evolucionesda(data.chain)) // Procesar la cadena
                .catch(error => console.error('Error en la cadena de evolución:', error));
        })
        .catch(error => console.error('Error en la especie:', error));



        let globalData = fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then((response) => response.json())
    .catch(error => console.error)


function evolucionesda(data) {

    const evolucione = [data.species.name]; // Inicializar con el primer Pokémon
    let evolution = data.evolves_to[0]; // Siguiente evolución

    // Iterar sobre las evoluciones
    while (evolution) {
        evolucione.push(evolution.species.name); // Agregar a la lista
        evolution = evolution.evolves_to[0]; // Siguiente evolución
    }

    let datos = [];

    const divEvolution = document.querySelector('.evoluciones');
    Promise.all(
        evolucione.map(pokemon => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
        )
    ).then(results => {
        datos = results; // Almacena todos los resultados cuando estén listos
    
        datos.forEach(pokemon => { 
            divEvolution.innerHTML += `
                <a  href="pokemon.html?pokemon=${pokemon.id}">
                    <div class="imagen-evolucion">

                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                            alt="${pokemon.name}">
                    </div>
                    <p>${pokemon.name}</p>
                </a>`;
        // Separar elementos de datos
    });
    }).catch(error => console.error('Error en la promesa:', error));
    

 

}

