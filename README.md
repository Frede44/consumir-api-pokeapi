# PokeWeb

**Descripción**

PokeWeb es una página web sencilla hecha con **HTML**, **CSS** y **JavaScript** que consume la **PokeAPI** para mostrar información de Pokémon: listado, búsqueda, paginación y ficha detallada de cada Pokémon (sprites, tipos, estadísticas, habilidades y más). Está pensada como proyecto didáctico y demo para practicar consumo de APIs REST, manipulación del DOM y manejo de datos asíncronos.

---

## Tecnologías

* HTML5
* CSS3 (puedes usar tu propio framework si quieres)
* JavaScript (ES6+)
* API pública: [PokeAPI](https://pokeapi.co/)

---

## Funcionalidades

* Listado de Pokémon con paginación (por ejemplo 20 por página).
* Búsqueda por nombre o ID.
* Ver ficha detallada en un modal o página aparte (sprites, tipos, estadísticas, peso, altura, habilidades).
* Manejo básico de errores (API no disponible, Pokémon no encontrado).
* Indicador de carga (spinner) mientras se obtienen datos.
* Opcional: guardar favoritos en localStorage.

---

## Estructura de archivos (sugerida)

```
pokedex/
├─ index.html         # Página principal
├─ css/
│  └─ styles.css
├─ js/
│  ├─ api.js          # Funciones para llamar a PokeAPI
│  ├─ app.js          # Lógica de la UI, paginación, eventos
│  └─ utils.js        # Helpers (formatos, manejo de localStorage)
└─ assets/
   └─ (imagenes, iconos)
```

---

## Cómo ejecutar (desarrollo)

1. Clona o descarga el proyecto en tu máquina.
2. Abre `index.html` en el navegador (no necesitas servidor si no usas módulos ES o llamadas bloqueadas por CORS). Si usas `fetch` con rutas relativas o módulos, ejecuta un servidor local simple (por ejemplo `npx http-server` o `python -m http.server`).
3. Navega y prueba la búsqueda y paginación.

---

## Uso de la PokeAPI

* Endpoint principal para listados:

  * `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
* Endpoint para datos de un Pokémon (por nombre o id):

  * `https://pokeapi.co/api/v2/pokemon/{id_or_name}`

**Consejos**:

* La API permite paginar con `limit` y `offset`.
* Evita llamadas repetidas: cachea resultados frecuentes en `sessionStorage` o `localStorage`.
* Respeta límites y buenas prácticas (no spamear la API con peticiones innecesarias).

---

## Ejemplo de uso en `api.js`

```js
const API_BASE = 'https://pokeapi.co/api/v2';

async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Error al obtener lista');
  return res.json();
}

async function fetchPokemon(idOrName) {
  const res = await fetch(`${API_BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error('Pokémon no encontrado');
  return res.json();
}
```

---

## Ideas de mejora

* Añadir filtros por tipo, peso o estadísticas.
* Implementar infinite scroll en vez de paginación clásica.
* Mejorar UX: skeleton loading, animaciones, transiciones.
* Integrar PokeAPI sprites en alta resolución o usar servidores CDN para imágenes.
* Añadir tests unitarios para funciones de `api.js` y `utils.js`.

---

## Contribuir

1. Haz fork del repositorio.
2. Crea una rama con la mejora: `feature/nueva-funcion`.
3. Haz commit y push.
4. Abre un pull request describiendo los cambios.

---

## Licencia

Este proyecto es de uso educativo. Puedes usarlo y modificarlo libremente (añade tu propia licencia si lo publicas).

---

## Contacto

Si tienes dudas o quieres que te ayude a integrar alguna funcionalidad (por ejemplo paginación optimizada o favoritos con localStorage), escríbeme.

¡Disfruta construyendo tu PokeWeb! 🎮⚡️
