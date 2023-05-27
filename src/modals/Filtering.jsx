import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Filterbtn from '../assets/filter-6535.svg'
import style from '../styling/Filteringmodal.module.scss'
import { getVillagers } from '../api/villagers'
import { getSeacreatures } from '../api/seacreatures'
import { getBugs } from '../api/bugs'

const Filtering = (props) => {
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

    const [originalSea, setOriginalSea] = useState([])
    const [originalBug, setOriginalBug] = useState([])
    const [originalVillagers, setOriginalVillagers] = useState([])
    useEffect(() => {
        if (props.fromPage !== 'songPage') {
            getVillagers()
                .then((villagersdata) => {
                    setOriginalVillagers(villagersdata)
                })
        }
        if (props.fromPage == 'seaPage') {
            getSeacreatures()
                .then((seadata => {
                    setOriginalSea(seadata)
                }))
        }
        if (props.fromPage == 'bugPage') {
            getBugs()
                .then((bugdata => {
                    setOriginalBug(bugdata)
                }))
        }
    }, [originalVillagers,])

    const [passedArray, setPassedArray] = useState([])
    const setFilteredArray = (q) => {
        if (props.fromPage == 'villagerPage') {
            if (q === 'Female' || q === 'Male') {
                setPassedArray(originalVillagers.filter(villager => villager.gender === q))
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Alph') {
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
                return props.onUpdatedFilter(passedArray)

            }
            else if (q === 'Reset') {
                setPassedArray(originalVillagers)
                return props.onUpdatedFilter(passedArray)
            }
        }

        if (props.fromPage == 'seaPage') {

            if (q === 'Alph') {
                const sortedArray = [...originalSea].sort((a, b) => {
                    const nameA = a.name["name-USen"].toLowerCase();
                    const nameB = b.name["name-USen"].toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)

            }
            else if (q === 'Hp') {
                const sortedArray = [...originalSea].sort((a, b) => {
                    return b['price'] - a['price'];
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Lp') {
                const sortedArray = [...originalSea].sort((a, b) => {
                    return a['price'] - b['price'];
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Reset') {
                setPassedArray(originalSea)
                return props.onUpdatedFilter(passedArray)
            }

        }

        if (props.fromPage == 'bugPage') {

            if (q === 'Alph') {
                const sortedArray = [...originalBug].sort((a, b) => {
                    const nameA = a.name["name-USen"].toLowerCase();
                    const nameB = b.name["name-USen"].toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)

            }
            else if (q === 'Hp') {
                const sortedArray = [...originalBug].sort((a, b) => {
                    return b['price'] - a['price'];
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Lp') {
                const sortedArray = [...originalBug].sort((a, b) => {
                    return a['price'] - b['price'];
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Reset') {
                setPassedArray(originalBug)
                return props.onUpdatedFilter(passedArray)
            }

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
                {
                    props.fromPage == 'seaPage' ?
                        <>
                            <NavLink to={`/seacreatures`}
                                style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                onClick={() => { setFilterActive(false); setFilteredArray('Alph'); }}>
                                <h2>Alphabetical order</h2>
                            </NavLink>
                            <NavLink to={`/seacreatures`}
                                style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                onClick={() => { setFilterActive(false); setFilteredArray('Hp') }}>
                                <h2>Highest price</h2>
                            </NavLink>
                            <NavLink to={`/seacreatures`}
                                style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                onClick={() => { setFilterActive(false); setFilteredArray('Lp') }}>
                                <h2>Lowest price</h2>
                            </NavLink>
                            <NavLink to={`/seacreatures`}
                                onClick={() => { setFilterActive(false); setFilteredArray('Reset') }}>
                                <h2>Reset</h2>
                            </NavLink>
                        </>
                        : props.fromPage == 'villagerPage' ?
                            <>
                                <NavLink to={`/villagers`}
                                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                    onClick={() => { setFilterActive(false); setFilteredArray('Alph'); }}>
                                    <h2>Alphabetical order</h2>
                                </NavLink>
                                <NavLink to={`/villagers`}
                                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                    onClick={() => { setFilterActive(false); setFilteredArray('Female') }}>
                                    <h2>Females</h2>
                                </NavLink>
                                <NavLink to={`/villagers`}
                                    style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                    onClick={() => { setFilterActive(false); setFilteredArray('Male') }}>
                                    <h2>Males</h2>
                                </NavLink>
                                <NavLink to={`/villagers`}
                                    onClick={() => { setFilterActive(false); setFilteredArray('Reset') }}>
                                    <h2>Reset</h2>
                                </NavLink>
                            </>
                            : props.fromPage == 'bugPage' ?
                                <>
                                    <NavLink to={`/bugs`}
                                        style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                        onClick={() => { setFilterActive(false); setFilteredArray('Alph'); }}>
                                        <h2>Alphabetical order</h2>
                                    </NavLink>
                                    <NavLink to={`/bugs`}
                                        style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                        onClick={() => { setFilterActive(false); setFilteredArray('Hp') }}>
                                        <h2>Highest price</h2>
                                    </NavLink>
                                    <NavLink to={`/bugs`}
                                        style={({ isActive }) => ({ color: isActive ? '#90d6d6' : 'inherit' })}
                                        onClick={() => { setFilterActive(false); setFilteredArray('Lp') }}>
                                        <h2>Lowest price</h2>
                                    </NavLink>
                                    <NavLink to={`/bugs`}
                                        onClick={() => { setFilterActive(false); setFilteredArray('Reset') }}>
                                        <h2>Reset</h2>
                                    </NavLink>
                                </>
                                : ''
                }
                {/* <NavLink to={`/villagers/filters/alph`}
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
                </NavLink> */}
            </div>
        </div>
    )

}

export default Filtering