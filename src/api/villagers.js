const url = 'https://acnhapi.com/v1a'

function getVillagers(){
    return fetch(`${url}/villagers`)
    .then(res => res.json())
}
export{
    getVillagers
}