import { useState } from 'react'
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

    function zodiac(birth) {
        const date = parseFloat(birth.replace(/[^\d\.]*/g, ''));

        if (birth.includes("January")) {
            if (date < 20)
                return <img src={capricorn} alt="Capricorn" />;
            else
                return <img src={aquarius} alt="Aquarius" />;
        }
        else if (birth.includes("February")) {
            if (date < 19)
                return <img src={aquarius} alt="aquarius" />;
            else
                return <img src={pisces} alt="pisces" />;
        }
        else if (birth.includes("March")) {
            if (date < 21)
                return <img src={pisces} alt="pisces" />;
            else
                return <img src={aries} alt="aries" />;
        }
        else if (birth.includes("April")) {
            if (date < 20)
            return <img src={aries} alt="aries" />;
            else
            return <img src={taurus} alt="taurus" />;
        }
        else if (birth.includes("May")) {
            if (date < 21)
            return <img src={taurus} alt="taurus" />;
            else
            return <img src={gemini} alt="gemini" />;
        }
        else if (birth.includes("June")) {
            if (date < 21)
            return <img src={gemini} alt="gemini" />;
            else
            return <img src={cancer} alt="cancer" />;
        }
        else if (birth.includes("July")) {
            if (date < 23)
            return <img src={cancer} alt="cancer" />;
            else
            return <img src={leo} alt="leo" />;
        }
        else if (birth.includes("August")) {
            if (date < 23)
            return <img src={leo} alt="leo" />;
            else
            return <img src={virgo} alt="virgo" />;
        }
        else if (birth.includes("September")) {
            if (date < 23)
            return <img src={virgo} alt="virgo" />;
            else
            return <img src={libra} alt="libra" />;
        }
        else if (birth.includes("October")) {
            if (date < 23)
            return <img src={libra} alt="libra" />;
            else
            return <img src={scorpio} alt="scorpio" />;
        }
        else if (birth.includes("November")) {
            if (date < 22)
            return <img src={scorpio} alt="scorpio" />;
            else
            return <img src={sagittarius} alt="sagittarius" />;
        }
        else if (birth.includes("December")) {
            if (date < 22)
            return <img src={sagittarius} alt="sagittarius" />;
            else
            return <img src={capricorn} alt="capricorn" />;
        }
    }


    function villagerdescription(name, species, phrase, personality,gender){
        if(gender === 'Male'){
        const pronouns = "he";
        return <p>
            {name} is a specie of {species} and {pronouns} is a bit {personality.toLowerCase()}  
             . When {name} catches something {pronouns} says "{phrase}"".
        </p>
        }
        else  if(gender === "Female"){
        const pronouns = "she";
        return <p>{name} is a specie of {species} and {pronouns} is a bit {personality.toLowerCase(0)}. When {name} catches something {pronouns} says "{phrase}".</p>
        }      
    }

    return (
        <div className={style.villagercard}>
            <section>
                <div className={style.iconholder}>
                <img src={villager.image_uri} className={style.villagericon} alt="" />

                </div>
                <span>
                    <h1>{villager.name["name-USen"]}</h1>
                    {genders(villager.gender)}
                </span>
                <span className={style.birthday}>
              <img src={BdayCake} alt="" />   <h2>{villager['birthday-string']} </h2>{zodiac(villager['birthday-string'])}</span>
                   <p>{villagerdescription(
                        villager.name["name-USen"],
                        villager.species,
                        villager["catch-phrase"],
                        villager.personality,
                        villager.gender
                    )}</p> 
              
            </section>

        </div>
    )
}
export default Villagercard;