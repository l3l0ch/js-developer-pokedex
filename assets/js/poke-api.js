// Esse arquivo tem que ser processado antes do principal na pagina
// é só linkar ele antes da chamada do js principal


const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.num = pokeDetail.id
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokeDetail.types[0].type.name
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

// converte a response com a url dos detalhes de cada poke para json
pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = function (offset = 0, limit = 11) {
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


pokeApi.getPokemonsLinkStats = function (offset = 0, limit = 11) {
    // Está função está retornando uma response com uma lista de array com links
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    const urlsStats = []
    return fetch(url)
            .then( function (response){ 
                return response.json()
            })
            .then( function (jsonBody){
                // console.log(jsonBody.results[0].url)
                return jsonBody.results;
            })
            .then((response) =>{
                for (let i in response){
                    urlsStats.push(response[i].url);
                }   
    return urlsStats     
            })
            .catch((error) =>{ console.log('Erro ao encontrar links: ',error)})
    
    }

// acessando a response com os links e fazendo requisições a todos os links 
// com a finalidade de acessar o banco de dados com os status dos pokemons
pokeApi.getPokemonsStats = pokeApi.getPokemonsLinkStats().then((stats) => {
    for (let i = 0; i < stats.length; i++) {
        fetch(stats[i])
            .then(function (response) {
                return response.json()
            })
            .then(function (propriedadesList) { // está acessando as propriedades dos pokes
                console.log(propriedadesList.stats); 
                return propriedadesList.stats // retornando apenas a propriedade de Status
            })
            .then((propriedades) => {
                propriedades.map((atributo) => {
                    console.log(atributo.stat.name) // hp , atk, def...
                    console.log(atributo.base_stat) // valores numericos dos atributos
                })
            })
    }
})







// pokeApi.getPokemonsLinkStats().then(function (urls) {
//     pokeApi.getPokemonsStats(urls);
// });


// Promise.all([
// 	fetch('https://pokeapi.co/api/v2/pokemon/1'),
// 	fetch('https://pokeapi.co/api/v2/pokemon/2'),
// 	fetch('https://pokeapi.co/api/v2/pokemon/3'),
// 	fetch('https://pokeapi.co/api/v2/pokemon/4'),
// ]).then((results) => {
// 	console.log(results)
// })
