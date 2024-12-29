

/*            <div class="card-pokemon">
                <div class="card-pokemon-grass">
                    <img class="imagen-pokemon"
                        src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
                        alt="bulbasaur">
                </div>
                <div class="info-pokemon">
                    <h3 class="id-pokemon">N.° 001 </h3>
                    <h2 class="nombre-pokemon">bulbasaur</h2>
                    <div class="tipos">
                        <span class="tipo-grass">planta</span>
                        <span class="tipo-poison">veneno</span>
                    </div>
                </div>
            </div>*/


// Función que crea una card de un pokemon 
const contenedor = document.querySelector('.pokemon-container');
const botonCargar = document.querySelector('.btn-cargar');
const buscar = document.getElementById('busqueda');
const ordenarAleatorio = document.getElementById('btnAleatorio');

let offset = 0;
let limit = 30;

// Caché local para mejorar rendimiento
let pokemonCache = {};
let allPokemons = []; // Almacena todos los Pokémon cargados localmente

// Cargar más Pokémon al hacer clic
botonCargar.addEventListener('click', () => {
  offset += 30;
  cargarPokemons(offset, limit);
});

// Primera carga
cargarPokemons(offset, limit);

// Función para cargar Pokémon por página
function cargarPokemons(offset, limit) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      allPokemons = [...allPokemons, ...data.results]; // Añadir los Pokémon al caché
      llamarApi(data.results);
    })
    .catch(error => console.error('Error:', error));
}

// Llamar a la API para obtener detalles
function llamarApi(pokemons) {
  const promises = pokemons.map(p => {
    if (pokemonCache[p.name]) {
      return Promise.resolve(pokemonCache[p.name]); // Usa caché
    } else {
      return fetch(p.url)
        .then(res => res.json())
        .then(data => {
          pokemonCache[p.name] = data; // Guarda en caché
          return data;
        });
    }
  });

  Promise.all(promises)
    .then(results => results.forEach(data => crearcard(data)))
    .catch(error => console.error('Error:', error));
}

// Crear tarjeta para mostrar cada Pokémon
function crearcard(pokemons) {
  let tiposHTML = ""; // Almacena los tipos

  for (let index = 0; index < pokemons.types.length; index++) {
    tiposHTML += `<span class="tipo-${pokemons.types[index].type.name}">
                    ${pokemons.types[index].type.name}
                 </span>`;
  }

  const idpokemonString = `N.° ${pokemons.id.toString().padStart(3, '0')}`;

  contenedor.innerHTML += `
             <a class="card-pokemon" href="pokemon.html?pokemon=${pokemons.id}">
                <div class="card-pokemon-${pokemons.types[0].type.name}">
                    <img class="imagen-pokemon"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons.id}.png"
                        alt="${pokemons.name}">
                </div>
                <div class="info-pokemon">
                    <h3 class="id-pokemon">${idpokemonString} </h3>
                    <h2 class="nombre-pokemon">${pokemons.name}</h2>
                    <div class="tipos">
                     ${tiposHTML}
                       </div>
                </div>
            </a>`;
}

// **Buscar Pokémon por nombre** (local + API)
let debounceTimer;
buscar.addEventListener('keyup', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const texto = buscar.value.toLowerCase();

    // Buscar en el caché local primero
    const pokemonsFiltrados = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(texto)
    );

    contenedor.innerHTML = ""; // Limpiar resultados previos

    if (pokemonsFiltrados.length > 0) {
      // Mostrar resultados desde el caché local
      llamarApi(pokemonsFiltrados);
    } else {
      // Buscar dinámicamente en la API
      fetch(`https://pokeapi.co/api/v2/pokemon/${texto}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('No encontrado');
          }
          return response.json();
        })
        .then(data => {
          pokemonCache[data.name] = data; // Añadir al caché
          crearcard(data); // Mostrar resultado
        })
        .catch(() => {
          contenedor.innerHTML = `<p>No se encontró el Pokémon "${texto}"</p>`;
        });
    }
  }, 300); // Espera 300ms antes de ejecutar
});


ordenarAleatorio.addEventListener('click', () => {
  contenedor.innerHTML = ""; // Limpiar resultados previos

  // Ordenar aleatoriamente
  allPokemons.sort(() => Math.random() - 0.5);
  console.log(Math.random() - 0.5);
  llamarApi(allPokemons);
}
);