import style from '../styling/Categories.module.scss'
const Categories = ({onChosenQuery}) => {

    return (
        <div className={style.categorieswrap}>
<ul className={style.listitems}>
    <li onClick={()=>onChosenQuery('villagers')}>
        - VILLAGERS -
    </li>
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