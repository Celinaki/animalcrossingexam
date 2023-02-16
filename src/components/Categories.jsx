import style from '../styling/Categories.module.scss'
import { NavLink } from 'react-router-dom';
import { getVillagers } from '../api/villagers';
import { useState } from 'react';
import { getSongs } from '../api/songs';

//{onChosenQuery}
const Categories = (props) => {
const [renderedList, setRenderedList] = useState([])


const fetchChosen = (q) => {
    if(q==='villagers'){
        getVillagers()
        .then((villagerData) =>{
        setRenderedList(villagerData) 
        console.log(renderedList)
        return  props.onChosenCat(q, villagerData)
        }) 

    }
    if(q === 'songs'){
        getSongs()
        .then((songData) => {
        setRenderedList(songData) 
        console.log(renderedList)
        return props.onChosenCat(q, songData)
        })
    }
}

    return (
        <div className={style.categorieswrap}>
<ul className={style.listitems}>
   <NavLink to={`/villagers`}>
     <li onClick={()=>{fetchChosen('villagers')}}>
        - VILLAGERS -
    </li>
    </NavLink>
    <NavLink to={`/songs`}>
    <li onClick={()=>{fetchChosen('songs')}}>
        - SONGS -
    </li>    
    </NavLink>
    <NavLink to={`/seacreatures`}>
    <li onClick={()=>{fetchChosen('seacreatures')}}>
        - SEARCREATURES -
    </li>
    </NavLink>
    <NavLink to={`/bugs`}>
    <li onClick={()=>{fetchChosen('bugs')}}>
        - BUGS -
    </li>
    </NavLink>
</ul>
        </div>
    )
}

export default Categories;