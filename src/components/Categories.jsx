import style from '../styling/Categories.module.scss'
import { NavLink } from 'react-router-dom';

const Categories = ({onChosenQuery}) => {

    return (
        <div className={style.categorieswrap}>
<ul className={style.listitems}>
   <NavLink to={`/villagers`}>
     <li onClick={()=>onChosenQuery('villagers')}>
        - VILLAGERS -
    </li></NavLink>
    <li onClick={()=>onChosenQuery('songs')}>
        - SONGS -
    </li>
    <li onClick={()=>onChosenQuery('seacreatures')}>
        - SEARCREATURES -
    </li>
    <li onClick={()=>onChosenQuery('bugs')}>
        - BUGS -
    </li>
</ul>
        </div>
    )
}

export default Categories;