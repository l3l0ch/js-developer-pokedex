
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

// function convertPokemonTypesToLi(pokemonTypes){
//     return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
// }


function convertPokemonToHtmlLi(pokemon) {
    // console.log(pokemon.stats.map((stats) =>{
    //     console.log(stats.stat.name)
    // }))
    return `
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.num}</span>
            <span class="name">${(pokemon.name).toUpperCase()}</span>

            <div class="datail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                    <img src=${pokemon.photo} alt=${pokemon.name}>
                    
            </div>
        
            <!-- Botão modal Stats --!>
            <div class="info">
            <a href="#demo-${pokemon.num}">Stats</a>
        </div>


        <!-- modal  --!>
            
            <div id="demo-${pokemon.num}" class="modal">
                <a class="modalClose" href="#">&times;</a>
                <h3>Stats:</h3>
                <div class="status">
                    ${pokemon.stats.map(stats =>
                        `<div>
                            ${(stats.stat.name)}
                            ${(stats.base_stat)}
                        </div>
                        <div class="${stats.stat.name}" style="width: ${stats.base_stat}px;"></div>
                        `
                        
                    ).join('')
                }
            </div>
        </div>

                

        <!-- :target - Seleciona um elemento que tenha o ID igual a URL do link--!>
       
    `
}
   
const listaPokemonsHtml = document.getElementById('pokemonsList');
var limit = 5; // limite de elementos por pagina
var offset = 0; // paginação

pokeApi.getPokemons()
    .then(function (pokemonsList = []) {
        // pegando cada elemento de lista e convertando em html li
        // o join ('') troca o separador default da lista por
        // espaço em branco, no caso nada
        // listaPokemonsHtml.innerHTML = pokemonsList.map(convertPokemonToHtmlLi).join('')
        for (let i =0; i <pokemonsList.length; i++) {
            listaPokemonsHtml.innerHTML += convertPokemonToHtmlLi(pokemonsList[i]);
           
        }
        return listaPokemonsHtml.innerHTML;
        
        // console.log(pokemonsList[0].types[0].type.name)

        // console.log(pokemonsList[0].sprites.front_default)
})

function page(){
    const prox_page = pokeApi.getPokemons(offset, limit)
        .then(function (pokemonsList){
            listaPokemonsHtml.innerHTML = pokemonsList.map(convertPokemonToHtmlLi).join('')
        
    })
    return prox_page
}
reset()
const max = 150;
function load(){
    offset += limit;
    let rec = offset + limit;
    if ( rec > max ){
        limit = 1;
        page().then((response) =>{
            const butLoad = document.getElementsByClassName('btn-load')[0];
            butLoad.parentElement.removeChild(butLoad);
            return;
        })
    
    }
    page()
        
}
function back(){
    offset -= limit;
    if (offset < 0){
        offset = 0;
        limit = 8;
    }
    const prox_page = pokeApi.getPokemons(offset, limit)
        .then(function (pokemonsList){
            listaPokemonsHtml.innerHTML = pokemonsList.map(convertPokemonToHtmlLi).join('')
        })
    listaPokemonsHtml.innerHTML = prox_page
}

function reset(){
    offset = 0;
    limit =8;
    const prox_page = pokeApi.getPokemons(offset, limit)
        .then(function (pokemonsList){
            listaPokemonsHtml.innerHTML = pokemonsList.map(convertPokemonToHtmlLi).join('')
        })
    listaPokemonsHtml.innerHTML = prox_page
}

// function getStats() {
//     return Promise.all([pokeApi.getPokemons(), pokeApi.getPokemonsLinkStats()]) // Coloque as chamadas de função dentro de um array
//         .then((results) => { // Ajuste a função de retorno de chamada para receber um único argumento
//             const pokemons = results[0]; // Resultado da primeira promessa
//             const stats = results[1]; // Resultado da segunda promessa
//             const fetchs = stats.map((stat) => {
//                 return fetch(stat)
//                     .then(function (response) {
//                         return response.json()
//                     })
//                     .then(function (propriedadesList) { // está acessando as propriedades dos pokes
//                         return propriedadesList.stats // retornando apenas a propriedade de Status
//                     })                
//                     .then((propriedades) => {
//                         const atributos = propriedades.map((propriedade) => {
//                             return propriedade.stat;
//                         });
//                         const poke = pokemons.map((poke) => {
//                             return poke;
//                         })              
//                         return { atributos, poke };
//                     });
//             });
//             return Promise.all(fetchs); 
//         })
//         .then((results) => {
//             const atributos = results[0];
//             const poke = results[1];
//             return { atributos, poke }; // Aqui você pode acessar os resultados de fetchs
//         }).then(({ atributos, poke }) => {
//             return { atributos, poke }
            
//         })
// }

// getStats().then(({ atributos, poke }) => {
//     console.log('Atributos:', atributos);
//     console.log('Poke:', poke);
// });
