document.addEventListener("DOMContentLoaded", (event) => {
      const botonBuscar = document.getElementById("btnBuscar");
      const buscador = document.getElementById("inputBuscar");
      const contenedor = document.getElementById("contenedor");
        
      function mostrarPokemons(pokemons) {
            contenedor.innerHTML = "";
            for (let pokemon of pokemons) {
                const div = document.createElement("div");
                div.className = "card mb-3"
                div.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${pokemon.sprites.front_default}" class="img-fluid rounded-start" alt="${pokemon.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5> 
                                <p class="card-text">ID: ${pokemon.id}</p>
                                <p class="card-text">Altura: ${pokemon.height / 10} m</p> 
                                <p class="card-text">Peso: ${pokemon.weight / 10} kg</p>
                                <p class="card-text">Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
                                <p class="card-text">Habilidades: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                                <p class="card-text">Estadísticas: ${pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.appendChild(div);
            }
        }      
        
      botonBuscar.addEventListener("click", function() {
            if (buscador.value === "") {
                  contenedor.innerHTML = "";
                  return;
            }
              
            const url_pokemon = `https://pokeapi.co/api/v2/pokemon/${buscador.value.toLowerCase()}`;
              
            fetch(url_pokemon)
                  .then(response => {
                        if (!response.ok) {
                        throw new Error('Pokémon no encontrado');
                        }
                        return response.json();
                  })
                  .then(pokemon => {
                        mostrarPokemons([pokemon]); // Pasamos un array con un solo Pokémon
                  })
                  .catch(error => {
                        alert("Error: " + error.message);
                        contenedor.innerHTML = ""; // Limpiamos el contenedor
                  });
            });
              
      })