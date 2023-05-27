import { useState, useEffect } from 'react'
import style from '../styling/SeacreatureCard.module.scss'
import CalenderIcon from '../assets/calender.svg'
import ClockIcon from '../assets/clock.svg'
import MapIcon from '../assets/ic_twotone-map.svg'
import SpeedIcon from '../assets/ic_outline-speed.svg'
import ShadowIcon from '../assets/icon-park-outline_heavy-wind.svg'
import OwlIcon from '../assets/mdi_owl.svg'
import MegaIcon from '../assets/uil_megaphone.svg'
import NorthIcon from '../assets/north.svg'
import SouthIcon from '../assets/south.svg'
import MoneyIcon from '../assets/money.svg'
import checkPrice from '../functions/CheckPrice'
import AOS from "aos";
import "aos/dist/aos.css";


const SeacreatureCard = (seacreature) => {
    const creature = seacreature.creature;
    const [allMonths, setAllMonths] = useState(false)

    const getTime = (time) => {
        if (time === null || time === "") {
            return <h2>It's available all hours of the day</h2>
        }
        else {
            return <h2>It's available during {time}</h2>
        }
    }

    const getMonths = (sMonths, nMonths) => {
        if (sMonths === null || sMonths === "") {
            return ''
        }
        else {

            return <>
                <span>
                    <img src={NorthIcon} alt="" /><h2>{nMonths}</h2>
                </span>
                <span>
                    <img src={SouthIcon} alt="" /><h2>{sMonths}</h2>
                </span>
            </>
        }
    }

    useEffect(() => {
        if (creature.availability["month-southern"] === null || creature.availability["month-southern"] === "") {
            setAllMonths(true)
        }
    }, [creature.availability["month-southern"]])

    const [showMore, setShowMore] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className={style.seacardwrapper} style={{minHeight:"580px"}}>

            <article className={style.iconholder}>
                <img src={creature.image_uri} alt="The creature" />
                <h1>{creature.name["name-USen"].charAt(0).toUpperCase() + creature.name["name-USen"].slice(1)}</h1>

            </article>
            <span className={`${style.flexed}`}>
                <img src={ClockIcon} alt="" />
                {getTime(creature.availability["time"])}
            </span>
            <section className={style.monthsAndIcons}>
                <span className={`${style.flexed}`}>
                    <img src={CalenderIcon} alt="" />
                    {
                        allMonths ? <h2>It's available all months of the year</h2> :
                            <h2>Available during these months</h2>

                    }
                </span>
                <span className={style.months}>
                    {getMonths(creature.availability["month-southern"], creature.availability["month-northern"])}
                </span>
            </section>
            <span className={style.flexed}>
                <img src={MoneyIcon} alt="" />
                <h2>It goes for {creature.price}  </h2>
                <img src={checkPrice(creature.price)} alt="" />
            </span>
            {
                showMore === true ?
                    <div className={style.back}
                    data-aos="fade-right"
                    data-aos-delay="50"
                    data-aos-easing="ease-in"
                    data-aos-duaration="100">
                        <span className={style.flexed}
                         data-aos="fade-right"
                         data-aos-delay="100"
                         data-aos-easing="ease-in"
                         data-aos-duaration="100"><img src={MegaIcon} alt="" /><h2>Catchphrase: "{creature["catch-phrase"]}"</h2></span>
                        <span className={style.flexed}
                         data-aos="fade-right"
                         data-aos-delay="200"
                         data-aos-easing="ease-in"
                         data-aos-duaration="100"><img src={SpeedIcon} alt="" /><h2>Speed: {creature.speed}</h2> </span>
                        <span className={style.flexed}
                         data-aos="fade-right"
                         data-aos-delay="300"
                         data-aos-easing="ease-in"
                         data-aos-duaration="100"><img src={ShadowIcon} alt="" /><h2>Shadow: {creature.shadow}</h2> </span>
                        <span className={style.flexed}
                         data-aos="fade-right"
                         data-aos-delay="400"
                         data-aos-easing="ease-in"
                         data-aos-duaration="100"><img src={OwlIcon} alt="" /><h2>Museumphrase: {creature["museum-phrase"]}</h2> </span>
                    </div>

                    :
                    ''
            }
            <button className={style.togglebutton}
                onClick={() => setShowMore(!showMore)}>
                {showMore ? 'SHOW LESS' : 'SHOW MORE'}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>




        </div>
    )
}
export default SeacreatureCard;