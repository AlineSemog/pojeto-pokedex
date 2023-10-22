const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
<div class="flip-container">
  <div class="flipper">
          <div class="pokemon ${pokemon.type}">
            <div class="cardpokemon" >
                    <figure class="pokemon-figure">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </figure>
                    
                    <section class="pokemon-detail">
                        <span class="number">#${Number(pokemon.number).toString().padStart(3, '0')}</span>
                        <h1 class="name">${pokemon.name[0].toUpperCase()+ pokemon.name.substring(1)}</h1>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                        </div>
                    </section>  
                </div>     
            </div>
        <div class="pokemonback ${pokemon.type}">
                    <section class="pokemon-detail">
                    <span class="number">#${Number(pokemon.number).toString().padStart(3, '0')}</span>
                    <h1 class="name">${pokemon.name[0].toUpperCase()+ pokemon.name.substring(1)}</h1>

                        <div class="detail">
                  
                        <h class="text-staus">HP </h> 
                        <div class="animated-progress progress-blue" width:150>                             
                            <span style="height:150px;width: ${pokemon.hp}%">${pokemon.hp}</span>
                        </div>
                        <h class="text-staus">Defence </h> 
                        <div class="animated-progress progress-green">
                            <span style="height:150px;width: ${pokemon.def}%">${pokemon.def}</span>
                        </div>
                        <h class="text-staus">Attack </h> 
                        <div class="animated-progress progress-purple">
                            <span style="height:150px;width: ${pokemon.atk}%">${pokemon.atk}</span>
                        </div>
                        <h class="text-staus">Speed </h> 
                        <div class="animated-progress progress-red">
                            <span style="height:150px;width: ${pokemon.speed}%">${pokemon.speed}</span>
                        </div>
                                             
                            
                        </div>
                    </section>        

      </div>
    </div>
  </div>  
        
    `
}




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


