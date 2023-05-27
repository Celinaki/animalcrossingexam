const url = 'https://acnhapi.com/v1a'

function getBugs(){
    return fetch(`${url}/bugs`)
    .then(res => res.json())
}
export{
    getBugs
}