import styles from '../styling/Searchbar.module.scss'

const SearchBar = (props) => {

    const updateState = (val) =>{
        props.searchOnQuery(val)
    }
    return(
<div className={styles.searchholder}>
<input className={styles.input} placeholder="Search for.." type="text" onChange={(e)=>updateState(e.target.value)}/>
</div>
        )
}

export default SearchBar