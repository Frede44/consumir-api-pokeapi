

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
const ordenar = document.getElementById('ordenar');

let offset = 0;
let limit = 30;


let pokemonCache = {};
let allPokemons = []; 


botonCargar.addEventListener('click', () => {
  offset += 30;
  cargarPokemons(offset, limit);
});

// Primera carga
cargarPokemons(offset, limit);


function cargarPokemons(offset, limit) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      allPokemons = [...allPokemons, ...data.results]; 
      llamarApi(data.results);
    })
    .catch(error => console.error('Error:', error));
}


function llamarApi(pokemons) {
  const promises = pokemons.map(p => {
    if (pokemonCache[p.name]) {
      return Promise.resolve(pokemonCache[p.name]); 
    } else {
      return fetch(p.url)
        .then(res => res.json())
        .then(data => {
          pokemonCache[p.name] = data; 
          return data;
        });
    }
  });

  Promise.all(promises)
    .then(results => results.forEach(data => crearcard(data)))
    .catch(error => console.error('Error:', error));
}

function crearcard(pokemons) {
  let tiposHTML = ""; 

  for (let index = 0; index < pokemons.types.length; index++) {
    tiposHTML += `<span class="tipo-${pokemons.types[index].type.name}">
                    ${pokemons.types[index].type.name}
                 </span>`;
  }

  const idpokemonString = `N.° ${pokemons.id.toString().padStart(3, '0')}`;

  contenedor.innerHTML += `
             <a class="card-pokemon animate-slide-up" href="pokemon.html?pokemon=${pokemons.id}">
                <div class="card-pokemon-${pokemons.types[0].type.name}">
                    <img class="imagen-pokemon"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons.id}.png"
                        alt="${pokemons.name}"
                        loading="lazy">
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


let debounceTimer;
buscar.addEventListener('keyup', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const texto = buscar.value.toLowerCase();

    // Buscar en el caché local primero
    const pokemonsFiltrados = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(texto)
    );

    contenedor.innerHTML = ""; 

    if (pokemonsFiltrados.length > 0) {
    
      llamarApi(pokemonsFiltrados);
    } else {
   
      fetch(`https://pokeapi.co/api/v2/pokemon/${texto}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('No encontrado');
          }
          return response.json();
        })
        .then(data => {
          pokemonCache[data.name] = data;
          crearcard(data); // Mostrar resultado
        })
        .catch(() => {
          contenedor.innerHTML = `<p>No se encontró el Pokémon "${texto}"</p>`;
        });
    }
  }, 300); 
});


ordenarAleatorio.addEventListener('click', () => {
  contenedor.innerHTML = ""; // Limpiar resultados previos

  // Ordenar aleatoriamente
  allPokemons.sort(() => Math.random() - 0.5);

  llamarApi(allPokemons);



});

ordenar.addEventListener('change', () => {

  console.log(ordenar.value)
  contenedor.innerHTML = ""; // Limpiar resultados previos

  if (ordenar.value === 'ascendente') {

    allPokemons.reverse();
  } else if (ordenar.value === 'descendente') {
    allPokemons.reverse();
    console.log(allPokemons)
  }else if (ordenar.value === 'a-z') {
    allPokemons.sort((a, b) => a.name.localeCompare(b.name));
  }else if (ordenar.value === 'z-a') {
    allPokemons.sort((a, b) => b.name.localeCompare(a.name));
  }

  llamarApi(allPokemons);
});

// Modal functionality
const modal = document.querySelector('.modal');
const busquedaBtn = document.querySelector('.busquedaBtn');
const btnOcultar = document.querySelector('.btnocultar');

if (busquedaBtn) {
  busquedaBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
}

if (btnOcultar) {
  btnOcultar.addEventListener('click', () => {
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    } else {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Add scroll animation for Pokemon cards
function addScrollAnimation() {
  const cards = document.querySelectorAll('.card-pokemon');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-slide-up');
        }, index * 100);
      }
    });
  });

  cards.forEach(card => observer.observe(card));
}




