// Esse arquivo tem que ser processado antes do principal na pagina
// é só linkar ele antes da chamada do js principal


const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail = []){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.num = pokeDetail.id
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokeDetail.types[0].type.name
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default 
    pokemon.stats = pokeDetail.stats  
    pokemon.modalUpdate = `
        <div id="log">
            <section>
                <h3>Stats:</h3>
                <div class="status">
                    ${pokemon.stats.map(stats =>
                        `<div>
                          ${stats.stat.name}: ${stats.base_stat}
                        </div>
                         <div class="${stats.stat.name}" style="width: ${stats.base_stat}px;"></div>`
                    ).join('')}
                </div>
                <input type="button" onclick="fechar()" id="fechar" value="Fechar">
            </section>
        </div>
        `
    
    return pokemon
}

function stats() {
    
}
function fechar() {
    
}
// converte a response com a url dos detalhes de cada poke para json
pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((response) => {
            return convertPokeApiDetailToPokemon(response)
        })
}
pokeApi.getPokemons = function (offset = 0, limit = 8) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
                .then( function (response){ 
                    return response.json()
                })
                .then( function (jsonBody){
                    return jsonBody.results
                })// cria uma lista com as urls com detalhes de cada poke
                .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
                // Espera a lista de requisições serem resolvidas -> usando promise.all(lista requisiçoes)
                .then((detailRequest) => {
                    return Promise.all(detailRequest) //lista de json de detalhes
                })
                .then ((pokemonDetails) => {               
                    return pokemonDetails
                })
                
                .catch((error) =>{ console.log(error)})
}

// pokeApi.getPokemonsLinkStats = function (offset = 0, limit = 8) {
//     // Está função está retornando uma response com uma lista de array com links
//     const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
//     const urlsStats = []
//     return fetch(url)
//             .then( function (response){ 
//                 return response.json()
//             })
//             .then( function (jsonBody){
//                 // console.log(jsonBody.results[0].url)
//                 return jsonBody.results;
//             })
//             .then((response) =>{
//                 for (let i in response){
//                     urlsStats.push(response[i].url);
//                 }  
//     return urlsStats     
//             })
//             .catch((error) =>{ console.log('Erro ao encontrar links: ',error)})
    
//     }

// REUTILIZAR
    // `
    // <!-- modal -->
    // <dialog id="log">
    //     <section>
    //         <h3>Stats:</h3>
    //         <div class="status">
    //             ${pokemon.stats.map(stats =>
    //                 `<div>
    //                     ${(stats.stat.name)}
    //                     ${(stats.base_stat)}
    //                 </div>
    //                 <div class="${stats.stat.name}" style="width: ${stats.base_stat}px;"></div>
    //                 `
                    
    //             ).join('')}
    //         </div>
    //         <input type="button" onclick="fechar()" id="fechar" value="Fechar"></input>
    
    //     </section>
    // </dialog>
    // `
