import { useState } from 'react'
import Filterbtn from '../assets/filter-6535.svg'
import style from '../styling/Filteringmodal.module.scss'

const Filtering=({filterQuery})=>{
    const [filterActive, setFilterActive] = useState(false)
    return(
<div className={style.filterwrap}>
    <img src={Filterbtn} alt="Filtering button" 
     onClick={()=>{
        setFilterActive(!filterActive);
        // toggleFiltering(filterActive);
     }}
     />  
     <div className={filterActive ? `${style.filterlist}${style.filterlistactive}` : style.filterlist }>
        <h1>Sort by</h1>
        <h2 onClick={()=>filterQuery('alph')}>Alphabetical order</h2>
        <h2 onClick={()=>filterQuery('Female')}>Male</h2>
        <h2 onClick={()=>filterQuery('Male')}>Male</h2>

     </div>
</div>        
    )

}

export default Filtering