import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Filterbtn from '../assets/filter-6535.svg'
import style from '../styling/Filteringmodal.module.scss'

const Filtering = ({ filterQuery }) => {
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
                    onClick={() => setFilterActive(false)}>
                    <h2>Alphabetical order</h2>
                </NavLink>
                <NavLink to={`/villagers/filters/Female`}
                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                    onClick={() => setFilterActive(false)}>
                    <h2>Females</h2>
                </NavLink>
                <NavLink to={`/villagers/filters/Male`}
                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                    onClick={() => setFilterActive(false)}>
                    <h2>Males</h2>
                </NavLink>
                <NavLink to={`/villagers`}
                    onClick={() => setFilterActive(false)}>
                    <h2>Reset</h2>
                </NavLink>
            </div>
        </div>
    )

}

export default Filtering