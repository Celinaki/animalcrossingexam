const url = 'http://acnhapi.com/v1a'

function getSongs(){
    return fetch(`${url}/songs`)
    .then(res => res.json())
}
export{
    getSongs
}