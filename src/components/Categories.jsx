import style from '../styling/Categories.module.scss'
import { NavLink } from 'react-router-dom';
import { getVillagers } from '../api/villagers';
import { useState } from 'react';
import { getSongs } from '../api/songs';
import { useLocation } from 'react-router-dom';

//{onChosenQuery}
const Categories = (props) => {
const [renderedList, setRenderedList] = useState([])
const location = useLocation()

const fetchChosen = (q) => {
//     if(q==='villagers'){
//         getVillagers()
//         .then((villagerData) =>{
//         setRenderedList(villagerData) 
//         console.log(renderedList)
//         return  props.onChosenCat(q, villagerData)
//         }) 

//     }
//     if(q === 'songs'){
//         getSongs()
//         .then((songData) => {
//         setRenderedList(songData) 
//         console.log(renderedList)
//         return props.onChosenCat(q, songData)
//         })
//     }
 }

 const reloadPage= ( ) =>{
  if (window.location.pathname === '/villagers' || window.location.pathname === '/') {
    window.location.reload();
  }
  else if (window.location.pathname === '/songs' ) {
    window.location.reload();
  }
  else if (window.location.pathname === '/seacreatures' ) {
    window.location.reload();
  }
  else if (window.location.pathname === '/bugs' ) {
    window.location.reload();
  }
 }

    return (
        <div className={style.categorieswrap}>
<ul className={style.listitems}>
   <NavLink to={`/villagers`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
     <li 
     onClick={()=>{fetchChosen('villagers'); reloadPage()}}>
        - VILLAGERS -
    </li>
    </NavLink>
    <NavLink to={`/songs`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
    <li onClick={()=>{fetchChosen('songs');reloadPage()}}>
        - SONGS -
    </li>    
    </NavLink>
    <NavLink to={`/seacreatures`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
    <li onClick={()=>{fetchChosen('seacreatures');reloadPage()}}>
        - SEARCREATURES -
    </li>
    </NavLink>
    <NavLink to={`/bugs`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
    <li onClick={()=>{fetchChosen('bugs');reloadPage()}}>
        - BUGS -
    </li>
    </NavLink>
</ul>
        </div>
    )
}

export default Categories;