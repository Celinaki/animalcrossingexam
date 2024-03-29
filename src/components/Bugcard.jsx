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


const BugCard = (bug) => {
     const thebug = bug.bug;
     const [allMonths, setAllMonths] = useState(false)

     useEffect(()=>{
       console.log(thebug.north.months)
     })

    //ORIGINAL
    // const getTime = (time) => {
    //     if (time === null || time === "") {
    //         return <h2>It's available all hours of the day</h2>
    //     }
    //     else {
    //         return <h2>It's available during {time}</h2>
    //     }
    // }
    //ORIGINAL

        const getTime = (time) => {
        if ( time[0].time == "All day") {
            return <h2>It's available all hours of the day</h2>
        }
        else {
            return <h2>It's available during {time[0].time}</h2>
        }
    }
//ORINAL
    // const getMonths = (sMonths, nMonths) => {
    //     if (sMonths === null || sMonths === "") {
    //         return ''
    //     }
    //     else {
    //         return <>
    //             <span>
    //                 <img src={NorthIcon} alt="" /><h2>{nMonths}</h2>
    //             </span>
    //             <span>
    //                 <img src={SouthIcon} alt="" /><h2>{sMonths}</h2>
    //             </span>
    //         </>
    //     }
    // }
    //ORIGINAL
    
    const getMonths = (sMonths, nMonths) => {
        if (sMonths == "All year" || sMonths === "All year") {
            console.log(nMonths,  "här är north m")
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
        if (thebug.south.months == "All year" ) {
            setAllMonths(true)
        }
    }, [thebug.south.month])

    const [showMore, setShowMore] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    return (

        <div className={`${style.seacardwrapper} ${style.bugwrapper}`}
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-easing="ease-in"
            data-aos-duaration="50"
        >

           <article className={style.iconholder}>
                <img src={thebug.image_url} alt="The thebug" />
                <h1>{thebug.name.charAt(0).toUpperCase() + thebug.name.slice(1)}</h1>

            </article>
            
             
              {/* <span className={`${style.flexed}`}>
                     <span class="material-symbols-outlined">
                         schedule
                     </span>     
                     {getTime(thebug.availability["time"])}
             </span> */}

                <span className={`${style.flexed}`}>
                    <span class="material-symbols-outlined">
                        schedule
                    </span>     
                    {getTime(thebug.north.availability_array)}
                </span>
{/* 
        
          <section className={style.monthsAndIcons}>
                <span className={`${style.flexed}`}>
                    <span class="material-symbols-outlined">
                        calendar_today
                    </span>                    {
                        allMonths ? <h2>It's available all months of the year</h2> :
                            <h2>Available during these months</h2>
                    }
                </span>
                <span className={style.months}>
                    {getMonths(thebug.availability["month-southern"], thebug.availability["month-northern"])}
                </span>
            </section> */}

<section className={style.monthsAndIcons}>
                <span className={`${style.flexed}`}>
                    <span class="material-symbols-outlined">
                        calendar_today
                    </span> 
                    {
                        allMonths ?
                        <h2>It's available all months of the year</h2> 
                        :
                        <h2>Available during these months</h2>
                    }
                </span>
                <span className={style.months}>
                    {getMonths(thebug.south.months, thebug.north.months)}
                </span>
            </section>

               <span className={style.flexed}>
                <span class="material-symbols-outlined">
                    monetization_on
                </span>       
            <h2>It goes for {thebug.sell_nook}  </h2>
                <img src={checkPrice(thebug.sell_nook)} alt="" />
            </span>
            <span className={style.flexed}>
                <span class="material-symbols-outlined">
                    monetization_on
                </span>                <h2>Sells for {thebug.sell_flick} <img src={checkPrice(thebug.sell_flick)} alt="" />at Flicks  </h2>

            </span>
        
          {
                showMore === true ?
                    <div className={style.back}
                        data-aos="fade-right"
                        data-aos-delay="50"
                        data-aos-easing="ease-in"
                        data-aos-duaration="100"
                    >

                        <span className={style.flexed}
                            data-aos="fade-right"
                            data-aos-delay="100"
                            data-aos-easing="ease-in"
                            data-aos-duaration="100">
                            <span class="material-symbols-outlined">
                                campaign
                            </span>
                            <h2>Catchphrase: "{thebug.catchphrases[0]}"</h2>
                        </span>
                        {/* <span className={style.flexed}
                            data-aos="fade-right"
                            data-aos-delay="200"
                            data-aos-easing="ease-in"
                            data-aos-duaration="100">
                            <img src={OwlIcon} alt="" />
                            <h2>Museumphrase: {thebug["museum-phrase"]}</h2>
                        </span> */}
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