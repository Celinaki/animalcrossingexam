// const url = 'https://acnhapi.com/v1a'

// function getBugs(){
//     return fetch(`${url}/bugs`)
//     .then(res => res.json())
// }
// export{
//     getBugs
// }
const url = 'https://api.nookipedia.com/nh/bugs'

function getBugs(){
    return fetch(`${url}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.REACT_APP_APIKEY
        },
      })
    .then(res => res.json())
}
export{
    getBugs
}