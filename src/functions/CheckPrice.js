import bellcoin from '../assets/bell.png'
import bellsbag from '../assets/bellsbag.jpg'

function checkPrice(price){
if(price >= 200 ){
    return bellsbag
}
if(price === null){
    return ''
}
else return bellcoin
}
export default checkPrice;