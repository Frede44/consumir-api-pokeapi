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
const loadingOverlay = document.getElementById('loading');
const pokemonIdBadge = document.querySelector('.pokemon-id');
const currentPokemonSpan = document.querySelector('.current-pokemon');
var ctx = document.getElementById('myChart').getContext('2d');
let pokemonData = {}; 
let currentChart = null;


function obtenerPokemon(pokemon) {
    // Show loading
    showLoading();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            pokemonData = data; 
            imagenP(data);    
            grafica(data); 
            dibtipos(data);
            updateNavigationButtons(data.id);
            // Hide loading after a small delay for better UX
            setTimeout(hideLoading, 500);
        })
        .catch(error => {
            console.error('Error:', error);
            hideLoading();
            showError();
        });
}

function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

function showError() {
    nombrePokemon.textContent = 'Error cargando Pokémon';
    descripcion.textContent = 'No se pudo cargar la información del Pokémon.';
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
         const div = document.querySelector('.debilidades-tipos');
         // Clear previous weaknesses
         div.innerHTML = '';
         
        for (const weakness of weaknesses) {
            const span = document.createElement('span');
            span.textContent = capitalizeFirst(weakness);
            span.classList.add('tipo', 'tipo-' + weakness);
            div.appendChild(span);
        }
  }
  
  // Llamada inicial
 
  
  



// Función para mostrar la imagen y detalles
function imagenP(data) {
    // Update Pokemon ID and name in various places
    const paddedId = String(data.id).padStart(3, '0');
    pokemonIdBadge.textContent = `#${paddedId}`;
    currentPokemonSpan.textContent = capitalizeFirst(data.name);
    document.title = `${capitalizeFirst(data.name)} - Pokédex`;

    let imgElement = document.querySelector('#pokemon-image');
    if (!imgElement) {
        imgElement = document.createElement('img');
        imgElement.id = 'pokemon-image';
        const imageContainer = document.querySelector('.image-background');
        imageContainer.appendChild(imgElement);
    }

    imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    imgElement.alt = data.name;

    const kilogramos = data.weight / 10;
    const metros = data.height / 10;

    nombrePokemon.textContent = capitalizeFirst(data.name);

    // Enhanced form buttons with better event handling
    const formaButtons = document.querySelectorAll('.forma-btn');
    formaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            formaButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const form = button.getAttribute('data-form');
            if (form === 'shiny') {
                imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${data.id}.png`;
            } else {
                imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
            }
        });
    });

    // Get abilities
    const abilities = data.abilities.map(ability => capitalizeFirst(ability.ability.name)).join(', ');

    datos.innerHTML = `
        <div class="div-datos">
            <h3>Altura</h3>
            <p>${metros} m</p>
        </div>
        <div class="div-datos">
            <h3>Peso</h3>
            <p>${kilogramos} kg</p>
        </div>
        <div class="div-datos">
            <h3>Experiencia Base</h3>
            <p>${data.base_experience}</p>
        </div>
        <div class="div-datos">
            <h3>Habilidades</h3>
            <p>${abilities}</p>
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
    const tipos = data.types.map(type => type.type.name);
    const divTipos = document.querySelector('.todos-tipos');
    
    // Clear previous types
    divTipos.innerHTML = '';

    tipos.forEach(tipo => {
        const span = document.createElement('span');
        span.classList.add('tipo', 'tipo-' + tipo);
        span.textContent = capitalizeFirst(tipo);
        divTipos.appendChild(span);
    });
}



  



// Helper function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Navigation functions
function updateNavigationButtons(currentId) {
    const prevBtn = document.getElementById('prevPokemon');
    const nextBtn = document.getElementById('nextPokemon');
    
    // Update previous button
    if (currentId > 1) {
        prevBtn.style.display = 'flex';
        prevBtn.onclick = () => navigateToPokemon(currentId - 1);
    } else {
        prevBtn.style.display = 'none';
    }
    
    // Update next button (assuming there are at least 1010 Pokemon)
    if (currentId < 1010) {
        nextBtn.style.display = 'flex';
        nextBtn.onclick = () => navigateToPokemon(currentId + 1);
    } else {
        nextBtn.style.display = 'none';
    }
}

function navigateToPokemon(pokemonId) {
    window.location.href = `pokemon.html?pokemon=${pokemonId}`;
}


function grafica(data) {
    let stats = data.stats.map(stat => stat.base_stat);
    
    // Destroy existing chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HP', 'Ataque', 'Defensa', 'At. Especial', 'Def. Especial', 'Velocidad'],
            datasets: [{
                label: 'Estadísticas Base',
                data: stats,
                backgroundColor: 'rgba(59, 76, 202, 0.2)',
                borderColor: 'rgba(59, 76, 202, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(59, 76, 202, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 150,
                    ticks: {
                        stepSize: 25,
                        color: '#64748b'
                    },
                    grid: {
                        color: 'rgba(100, 116, 139, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(100, 116, 139, 0.2)'
                    },
                    pointLabels: {
                        color: '#1e293b',
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
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
    const divEvolution = document.querySelector('.cadena-evolutiva');
    
    // Clear previous evolutions
    divEvolution.innerHTML = '';

    Promise.all(
        evolucione.map(pokemon => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
        )
    ).then(results => {
        datos = results.filter(result => result !== undefined); // Filtrar resultados válidos
    
        datos.forEach((pokemon, index) => { 
            const evolutionElement = document.createElement('a');
            evolutionElement.href = `pokemon.html?pokemon=${pokemon.id}`;
            evolutionElement.className = 'evolucion-link';
            
            evolutionElement.innerHTML = `
                <div class="imagen-evolucion">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                        alt="${pokemon.name}">
                </div>
                <p>${capitalizeFirst(pokemon.name)}</p>
            `;
            
            divEvolution.appendChild(evolutionElement);
            
            // Add evolution arrow if not the last element
            if (index < datos.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'evolution-arrow';
                arrow.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 2rem; height: 2rem; color: var(--color-primario);">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                `;
                divEvolution.appendChild(arrow);
            }
        });
    }).catch(error => console.error('Error en la promesa:', error));
}

