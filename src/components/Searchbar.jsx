// import styles from '../styling/Searchbar.module.scss'

// const SearchBar = (props) => {

//     const updateState = (val) =>{
//         props.searchOnQuery(val)
//     }
    
//     return(
// <div className={styles.searchholder}>
// <input className={styles.input}
//  placeholder="Search for.." type="text" 
//  onChange={(e)=>updateState(e.target.value)}/>
// </div>
//         )
// }

// export default SearchBar
import React, { useState } from 'react';
import styles from '../styling/Searchbar.module.scss';
import { useEffect } from 'react';

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.searchOnQuery(searchValue);
      setSearchValue('')
    }
  };

  const handleButtonClick = () => {
    props.searchOnQuery(searchValue);
    setSearchValue('')

  };

  const updateState = (val) => {
    setSearchValue(val);
  };


  return (
    <div className={styles.searchholder}>
      <input
        className={styles.input}
        placeholder="Search for.."
        type="text"
        value={searchValue}
        onChange={(e) => updateState(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleButtonClick} className={styles.searchbutton}>
        <span className={styles.searchicon} class="material-symbols-outlined">
search
</span></button>
    </div>
  );
};

export default SearchBar;