import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Filterbtn from '../assets/filter-6535.svg'
import style from '../styling/Filteringmodal.module.scss'
import { getVillagers } from '../api/villagers'

const Filtering = ( props ) => {
    const [filterActive, setFilterActive] = useState(false)

    //Click outside div closes the modal
    const ref = useRef(null)
    useEffect(() => {
        const handleClick = (event) => {
            if (!ref.current.contains(event.target)) {
                setFilterActive(false)
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [filterActive])
    //Click outside div closes the modal


    const [originalVillagers, setOriginalVillagers] = useState([])
    useEffect(()=>{
        getVillagers()
        .then((villagersdata) => {
        setOriginalVillagers(villagersdata) 
    })
},[originalVillagers])

    const [passedArray, setPassedArray] = useState([])

    const setFilteredArray =(q)=>{

        if(q === 'Female' || q === 'Male') {
            console.log(q, "här e q i femalemale")
        //     getVillagers()
        //     .then((villagersdata) => {
        //     setOriginalVillagers(villagersdata) 
        // })
            setPassedArray(originalVillagers.filter(villager => villager.gender === q))
           return props.onUpdatedFilter(passedArray)

        }
        else if(q === 'Alph'){
        //     getVillagers()
        //     .then((villagersdata) => {
        //     setOriginalVillagers(villagersdata) 
        // })
                const sortedArray = [...originalVillagers].sort((a, b) => {
                  if (a.name["name-USen"] < b.name["name-USen"]) {
                    return -1;
                  }
                  if (a.name["name-USen"] > b.name["name-USen"]) {
                    return 1;
                  }
                  return 0;
                });
                setPassedArray(sortedArray)
                return  props.onUpdatedFilter(passedArray)

        }
        else if(q === 'Reset'){
            setPassedArray(originalVillagers)
            return props.onUpdatedFilter(passedArray)
        }     

    }

    useEffect(() => {
        props.onUpdatedFilter(passedArray);
    }, [passedArray]);

    return (
        <div className={filterActive ? `${style.filterwrapactive}` : style.filterwrap} ref={ref}>
            <img src={Filterbtn} alt="Filtering button"
                onClick={() => {
                    setFilterActive(!filterActive);
                }}
            />
            <div className={filterActive ? `${style.filterlist} ${style.filterlistactive}` : style.filterlist}>
                <h1>Sort by</h1>
                <NavLink to={`/villagers/filters/alph`}
                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                    onClick={() => {setFilterActive(false); setFilteredArray('Alph');  }}>
                    <h2>Alphabetical order</h2>
                </NavLink>
                <NavLink to={`/villagers/filters/Female`}
                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                    onClick={() => {setFilterActive(false); setFilteredArray('Female')}}>
                    <h2>Females</h2>
                </NavLink>
                <NavLink to={`/villagers/filters/Male`}
                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                    onClick={() => {setFilterActive(false);  setFilteredArray('Male')}}>
                    <h2>Males</h2>
                </NavLink>
                <NavLink to={`/villagers`}
                    onClick={() => {setFilterActive(false);  setFilteredArray('Reset')}}>
                    <h2>Reset</h2>
                </NavLink>
            </div>
        </div>
    )

}

export default Filtering