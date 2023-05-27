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


const BugCard = (bug) => {
    const thebug = bug.bug;
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
        if (thebug.availability["month-southern"] === null || thebug.availability["month-southern"] === "") {
            setAllMonths(true)
        }
    }, [thebug.availability["month-southern"]])

    const [showMore, setShowMore] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    return (

        <div className={`${style.seacardwrapper} ${style.bugwrapper}`}>

            <article className={style.iconholder}>
                <img src={thebug.image_uri} alt="The thebug" />
                <h1>{thebug.name["name-USen"].charAt(0).toUpperCase() + thebug.name["name-USen"].slice(1)}</h1>

            </article>
            <span className={`${style.flexed}`}>
                <img src={ClockIcon} alt="" />
                {getTime(thebug.availability["time"])}
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
                    {getMonths(thebug.availability["month-southern"], thebug.availability["month-northern"])}
                </span>
            </section>
            <span className={style.flexed}>
                <img src={MoneyIcon} alt="" />
                <h2>It goes for {thebug.price}  </h2>
                <img src={checkPrice(thebug.price)} alt="" />
            </span>
            <span className={style.flexed}>
                <img src={MoneyIcon} alt="" />
                <h2>Sells for {thebug["price-flick"]} at Flicks  </h2>
                <img src={checkPrice(thebug.price)} alt="" />
            </span>
            {
                showMore === true ?
                    <div className={style.back}>
                        <span className={style.flexed}> <img src={MegaIcon} alt="" /><h2>Catchphrase: "{thebug["catch-phrase"]}"</h2></span>
                        <span className={style.flexed}><img src={OwlIcon} alt="" /><h2>Museumphrase: {thebug["museum-phrase"]}</h2> </span>
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
export default BugCard;