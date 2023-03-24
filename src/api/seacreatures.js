const url = 'http://acnhapi.com/v1a'

function getSeacreatures(){
    return fetch(`${url}/sea`)
    .then(res => res.json())
}
export{
    getSeacreatures
}