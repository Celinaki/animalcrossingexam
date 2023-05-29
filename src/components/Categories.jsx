import style from '../styling/Categories.module.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

//{onChosenQuery}
const Categories = (props) => {
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

 const reloadPage = (path) => {
  if (window.location.pathname === path ) {
    window.location.reload();
  } else {
    window.location.href = path;
  }
};

    return (
        <div className={style.categorieswrap}>
<ul className={style.listitems}>
   <NavLink to={`/`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
     <li 
     onClick={()=>{fetchChosen('villagers'); reloadPage('/')}}>
        - VILLAGERS -
    </li>
    </NavLink>
    <NavLink to={`/songs`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
    <li onClick={()=>{fetchChosen('songs'); reloadPage('/songs')}}>
        - SONGS -
    </li>    
    </NavLink>
    <NavLink to={`/seacreatures`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
    <li onClick={()=>{fetchChosen('seacreatures'); reloadPage('/seacreatures')}}>
        - SEARCREATURES -
    </li>
    </NavLink>
    <NavLink to={`/bugs`}
      style={({ isActive }) => ({ background: isActive ? 'rgb(222 184 135 / 61%)' : '' })}>
    <li onClick={()=>{fetchChosen('bugs'); reloadPage('/bugs')}}>
        - BUGS -
    </li>
    </NavLink>
</ul>
        </div>
    )
}

export default Categories;