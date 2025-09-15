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

* 📋 Listar Pokémon en tarjetas dinámicas.

* 🔍 Buscar Pokémon por nombre.

* 📥 Cargar más Pokémon en lotes de 30.

* 🔁 Ordenar Pokémon de forma aleatoria.

* ↕️ Ordenar de forma ascendente, descendente o alfabéticamente (A-Z / Z-A).

* ⚡ Ver los tipos, nombre, ID y sprite oficial de cada Pokémon.

---

## Estructura de archivos (sugerida)

```
consumir-api-pokeapi/
├─ index.html         # Página principal
├─ estilos/
│  ├─ estilos.css
│  └─ estilospokemon.css
├─ js/
│  ├─ javascript.js          # Funciones para llamar a PokeAPI
│  ├─ pokemon.js          # Lógica de la UI, paginación, eventos
│  └─ .js        # Helpers (formatos, manejo de localStorage)
└─ img/
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
