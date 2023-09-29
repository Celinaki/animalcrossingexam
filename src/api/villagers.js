// const url = 'https://acnhapi.com/v1a'

// function getVillagers(){
//     return fetch(`${url}/villagers`)
//     .then(res => res.json())
// }
// export{
//     getVillagers
// }

const url = 'https://api.nookipedia.com/villagers?game=nh'

function getVillagers(){
    return fetch(`${url}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.REACT_APP_APIKEY
        },
      })
    .then(res => res.json())
}
export{
    getVillagers
}