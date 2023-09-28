import React, { useState, useRef, useEffect } from "react";
import styles from '../styling/SortBy.module.scss'
import { getVillagers } from '../api/villagers'
import { getSeacreatures } from '../api/seacreatures'
import { getBugs } from '../api/bugs'

const SortBy = (props) => {
    const [isActive, setIsActive] = useState(false)
    const [selected, setSelected] = useState('Sort by')

    const [filterActive, setFilterActive] = useState(false)


    const [originalSea, setOriginalSea] = useState([])
    const [originalBug, setOriginalBug] = useState([])
    const [originalVillagers, setOriginalVillagers] = useState([])
    useEffect(() => {

    }, [selected])
    //Click outside div closes the modal
    const referens = useRef(null)
    useEffect(() => {
        const handleClick = (event) => {
            if (!referens.current.contains(event.target)) {
                setFilterActive(false)
                setIsActive(false)
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [filterActive])
    //Click outside div closes the modal

    useEffect(() => {
        if (props.fromPage == 'villagerPage') {
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
        if (props.gender === 'Reset') {
            setSelected('Sort by')
        }
    }, [originalVillagers,])
    const [passedArray, setPassedArray] = useState([])


    const setFilteredArray = (q) => {

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

        else if (props.fromPage == 'bugPage') {
            if (q === 'Alph') {
                const sortedArray = [...originalBug].sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
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
                    return b.sell_nook - a.sell_nook;
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Lp') {
                const sortedArray = [...originalBug].sort((a, b) => {
                    return a.sell_nook - b.sell_nook;
                });
                setPassedArray(sortedArray)
                return props.onUpdatedFilter(passedArray)
            }
            else if (q === 'Reset') {
                setPassedArray(originalBug)
                return props.onUpdatedFilter(passedArray)
            }

        }
        else if (props.fromPage === 'villagerPage') {

            if (q === 'Alph') {
                if (props.gender === 'Female') {
                    const femaleArray = originalVillagers.filter(villager => villager.gender === 'Female');
                    const sortedArray = femaleArray.sort((a, b) => a.name["name-USen"].toLowerCase().localeCompare(b.name["name-USen"].toLowerCase()));
                    setPassedArray(sortedArray);
                    return props.onUpdatedFilter(sortedArray);
                }
                else if (props.gender === 'Male') {
                    const maleArray = originalVillagers.filter(villager => villager.gender === 'Male');
                    const sortedArray = maleArray.sort((a, b) => a.name["name-USen"].toLowerCase().localeCompare(b.name["name-USen"].toLowerCase()));
                    setPassedArray(sortedArray);
                    return props.onUpdatedFilter(sortedArray);
                }

                else if (props.gender === 'Reset') {
                    const sortedArray = [...originalVillagers].sort((a, b) => a.name["name-USen"].toLowerCase().localeCompare(b.name["name-USen"].toLowerCase()));
                    setPassedArray(sortedArray);
                    setSelected('Sort by')

                    return props.onUpdatedFilter(sortedArray);
                }
                else if (props.gender === 'Reset') {
                    setSelected('Sort by')
                }
                else {
                    const sortedArray = [...originalVillagers].sort((a, b) => a.name["name-USen"].toLowerCase().localeCompare(b.name["name-USen"].toLowerCase()));
                    setPassedArray(sortedArray);
                    setSelected('Alphabetical')
                    return props.onUpdatedFilter(sortedArray);
                }

            }

            else if (q === 'Birthday') {
                if (props.gender === 'Female') {
                    const femaleArray = originalVillagers.filter(villager => villager.gender === 'Female');
                    const sortedArray = femaleArray.sort((a, b) => {
                        const [aDay, aMonth] = a.birthday.split('/');
                        const [bDay, bMonth] = b.birthday.split('/');

                        if (aMonth !== bMonth) {
                            return aMonth - bMonth;
                        }

                        return aDay - bDay;
                    });
                    setPassedArray(sortedArray);
                    return props.onUpdatedFilter(sortedArray);
                }
                else if (props.gender === 'Male') {
                    const maleArray = originalVillagers.filter(villager => villager.gender === 'Male');
                    const sortedArray = maleArray.sort((a, b) => {
                        const [aDay, aMonth] = a.birthday.split('/');
                        const [bDay, bMonth] = b.birthday.split('/');

                        if (aMonth !== bMonth) {
                            return aMonth - bMonth;
                        }

                        return aDay - bDay;
                    });
                    setPassedArray(sortedArray);
                    return props.onUpdatedFilter(sortedArray);
                }
                else if (props.gender === 'Reset') {
                    setSelected('Sort by')
                }
                else {
                    const sortedArray = originalVillagers.sort((a, b) => {
                        const [aDay, aMonth] = a.birthday.split('/');
                        const [bDay, bMonth] = b.birthday.split('/');

                        if (aMonth !== bMonth) {
                            return aMonth - bMonth;
                        }

                        return aDay - bDay;
                    });
                    setPassedArray(sortedArray);
                    return props.onUpdatedFilter(sortedArray);
                }
            }

            else if (q === 'Reset') {
                if (props.gender === 'Female') {
                    const femaleArray = originalVillagers.filter(villager => villager.gender === 'Female');
                    setPassedArray(femaleArray);
                    return props.onUpdatedFilter(femaleArray);
                } else if (props.gender === 'Male') {
                    const maleArray = originalVillagers.filter(villager => villager.gender === 'Male');
                    setPassedArray(maleArray);
                    return props.onUpdatedFilter(maleArray);
                } else {
                    setPassedArray(originalVillagers);
                    return props.onUpdatedFilter(originalVillagers);
                }
            } else {

            }
        }

    }
    useEffect(() => {
        props.onUpdatedFilter(passedArray);
    }, [passedArray]);
    return (
        <div className={styles.dropdown} ref={referens}>
            <button className={styles.dropdownbtn}
                onClick={(e) => {
                    setIsActive(!isActive)
                }}>
                {selected}
                <span class="material-symbols-outlined">
                    sort
                </span>
            </button>

            {isActive && (
                <ul className={styles.dropdownContent}>
                    <li
                        className={styles.dropitem}
                        onClick={() => {
                            setIsActive(false);
                            setSelected('Alphabetical');
                            setFilteredArray('Alph');
                        }}
                    >
                        Alphabetical
                    </li>

                    {props.fromPage === 'villagerPage' ? (
                        <>
                            <li
                                className={styles.dropitem}
                                onClick={() => {
                                    setIsActive(false);
                                    setSelected('Birthday');
                                    setFilteredArray('Birthday');
                                }}
                            >
                                Birthday
                            </li>
                            <li
                                className={styles.dropitem}
                                onClick={() => {
                                    setIsActive(false);
                                    setSelected('Sort by');
                                    setFilteredArray('Reset');
                                }}
                            >
                                Reset
                            </li></>
                    ) : (
                        <>
                            <li
                                className={styles.dropitem}
                                onClick={() => {
                                    setIsActive(false);
                                    setSelected('Price low to high');
                                    setFilteredArray('Lp');
                                }}
                            >
                                Price low to high
                            </li>
                            <li
                                className={styles.dropitem}
                                onClick={() => {
                                    setIsActive(false);
                                    setSelected('Price high to low');
                                    setFilteredArray('Hp');
                                }}
                            >
                                Price high to low
                            </li>
                            <li
                                className={styles.dropitem}
                                onClick={() => {
                                    setIsActive(false);
                                    setSelected('Sort by');
                                    setFilteredArray('Reset');
                                }}
                            >
                                Reset
                            </li>
                        </>
                    )}
                </ul>
            )}
        </div>
    )

}
export default SortBy