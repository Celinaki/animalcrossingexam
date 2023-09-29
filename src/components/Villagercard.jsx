import { useEffect, useState } from 'react'
import style from '../styling/Villagercard.module.scss'
import capricorn from '../assets/zodiac-capricorn.svg'
import aquarius from '../assets/zodiac-aquarius.svg'
import aries from '../assets/zodiac-aries.svg'
import cancer from '../assets/zodiac-cancer.svg'
import gemini from '../assets/zodiac-gemini.svg'
import leo from '../assets/zodiac-leo.svg'
import libra from '../assets/zodiac-libra.svg'
import pisces from '../assets/zodiac-pisces.svg'
import sagittarius from '../assets/zodiac-sagittarius.svg'
import scorpio from '../assets/zodiac-scorpio.svg'
import taurus from '../assets/zodiac-taurus.svg'
import virgo from '../assets/zodiac-virgo.svg'
import BdayCake from '../assets/mdi_birthday-cake-outline.svg'


const Villagercard = (thevillager) => {
    const villager = thevillager.villager;

    function genders(gen) {
        if (gen === 'Male') {
            return <span class="material-symbols-outlined">
                male
            </span>
        } else {
            return <span class="material-symbols-outlined">
                female
            </span>
        }
    }

    function zodiac(month, date) {

        // const date = parseFloat(birth.replace(/[^\d\.]*/g, ''));

        if (month.includes("January")) {
            if (date < 20)
                return <img src={capricorn} alt="Capricorn" />;
            else
                return <img src={aquarius} alt="Aquarius" />;
        }
        else if (month.includes("February")) {
            if (date < 19)
                return <img src={aquarius} alt="aquarius" />;
            else
                return <img src={pisces} alt="pisces" />;
        }
        else if (month.includes("March")) {
            if (date < 21)
                return <img src={pisces} alt="pisces" />;
            else
                return <img src={aries} alt="aries" />;
        }
        else if (month.includes("April")) {
            if (date < 20)
                return <img src={aries} alt="aries" />;
            else
                return <img src={taurus} alt="taurus" />;
        }
        else if (month.includes("May")) {
            if (date < 21)
                return <img src={taurus} alt="taurus" />;
            else
                return <img src={gemini} alt="gemini" />;
        }
        else if (month.includes("June")) {
            if (date < 21)
                return <img src={gemini} alt="gemini" />;
            else
                return <img src={cancer} alt="cancer" />;
        }
        else if (month.includes("July")) {
            if (date < 23)
                return <img src={cancer} alt="cancer" />;
            else
                return <img src={leo} alt="leo" />;
        }
        else if (month.includes("August")) {
            if (date < 23)
                return <img src={leo} alt="leo" />;
            else
                return <img src={virgo} alt="virgo" />;
        }
        else if (month.includes("September")) {
            if (date < 23)
                return <img src={virgo} alt="virgo" />;
            else
                return <img src={libra} alt="libra" />;
        }
        else if (month.includes("October")) {
            if (date < 23)
                return <img src={libra} alt="libra" />;
            else
                return <img src={scorpio} alt="scorpio" />;
        }
        else if (month.includes("November")) {
            if (date < 22)
                return <img src={scorpio} alt="scorpio" />;
            else
                return <img src={sagittarius} alt="sagittarius" />;
        }
        else if (month.includes("December")) {
            if (date < 22)
                return <img src={sagittarius} alt="sagittarius" />;
            else
                return <img src={capricorn} alt="capricorn" />;
        }
    }


    function villagerdescription(name, species, phrase, personality, gender) {
        if (gender === 'Male') {
            const pronouns = "he";
            return <p>
                {name} is a specie of {species} and {pronouns} is a bit {personality.toLowerCase()}
                . When {name} catches something {pronouns} says "{phrase}"".
            </p>
        }
        else if (gender === "Female") {
            const pronouns = "she";
            return <p>{name} is a specie of {species} and {pronouns} is a bit {personality.toLowerCase(0)}. When {name} catches something {pronouns} says "{phrase}".</p>
        }
    }

    return (
        <div className={style.villagercard}
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-easing="ease-in"
            data-aos-duaration="50"
        >
            <section>
                <div className={style.iconholder}>
                    <img src={villager.image_url} className={style.villagericon} alt="" />

                </div>
                <span>
                    <h1>{villager.name}</h1>
                    {genders(villager.gender)}
                </span>
                <span className={style.birthday}>
                    <img src={BdayCake} alt="" />
                    <h2>{villager.birthday_day} {villager.birthday_month} </h2>
                    {zodiac(villager.birthday_month, villager.birthday_day)}
                </span>
                <p>{villagerdescription(
                    villager.name,
                    villager.species,
                    villager.phrase,
                    villager.personality,
                    villager.gender
                )}</p>

            </section>

        </div>
    )
}
export default Villagercard;