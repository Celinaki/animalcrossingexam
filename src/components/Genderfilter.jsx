import { getVillagers } from '../api/villagers';
import React, { useState, useEffect } from 'react';
import style from '../styling/Genderfilter.module.scss'

const GenderFilter = (props) => {
    const [originalVillagers, setOriginalVillagers] = useState([]);
    const [passedArray, setPassedArray] = useState([]);
    const [activeButton, setActiveButton] = useState('');


    const setFilteredArray = (q) => {
        let filteredArray = [];
        if (q === 'Female') {
            filteredArray = originalVillagers.filter(villager => villager.gender === q);
        } else if (q === 'Male') {
            filteredArray = originalVillagers.filter(villager => villager.gender === q);
        } else if (q === 'Reset') {
            filteredArray = originalVillagers;
        }
        setPassedArray(filteredArray);
        props.genderQuery(q)
        props.onUpdatedFilter(filteredArray);
        setActiveButton(q);
    };

    useEffect(() => {
        getVillagers()
            .then((villagersdata) => {
                setOriginalVillagers(villagersdata);
            });
    }, []);

    return (
        <div>
            <section className={style.filterparent}>
                <span className={style.buttonparent}>
                    <button
                        className={activeButton === 'Female' ? `${style.activebutton}` : style.filterbutton}
                        onClick={() => setFilteredArray('Female')}
                    >
                        Females
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    {activeButton === 'Female' && (
                        <span
                            className={`${style.resetbutton} ${"material-symbols-outlined"}`}
                            onClick={() => setFilteredArray('Reset')}>
                            close
                        </span>
                    )}
                </span>

                <span className={style.buttonparent}>
                    <button
                        className={activeButton === 'Male' ? `${style.activebutton}` : style.filterbutton}
                        onClick={() => setFilteredArray('Male')}
                    >
                        Males
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    {activeButton === 'Male' && (
                        <span
                            className={`${style.resetbutton} ${"material-symbols-outlined"}`}
                            onClick={() => setFilteredArray('Reset')}
                        >
                            close
                        </span>
                    )}
                </span>
            </section>
        </div>
    );
};

export default GenderFilter;
