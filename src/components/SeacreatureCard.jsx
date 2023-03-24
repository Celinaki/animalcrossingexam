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
    const [isFlipped,setIsFlipped] = useState(false)

    return (

    //     <div className={style.card} >
	// 	<div className={`${style.cardInner} ${isFlipped ? style.isFlipped : ''} `} onClick={()=>setIsFlipped(!isFlipped)} >
	// 		<div className={`${style.cardFace} ${style.cardFaceFront}`}>
    //         <article className={style.iconholder}>
    //                  <img src={creature.image_uri} alt="The creature" />
    //             </article>
    //              <h1>{creature.name["name-USen"].charAt(0).toUpperCase() + creature.name["name-USen"].slice(1)}</h1>
    //              <span className={`${style.flexed}`}>
    //                  <img src={ClockIcon} alt="" />
    //                  {getTime(creature.availability["time"])}
    //              </span>
    //              <section className={style.monthsAndIcons}>
    //                  <span className={`${style.flexed}`}>
    //                      <img src={CalenderIcon} alt="" />
    //                      {
    //                          allMonths ? <h2>It's available all months of the year</h2> :
    //                              <h2>Available during these months</h2>

    //                      }
    //                  </span>
    //                  <span className={style.months}>
    //                      {getMonths(creature.availability["month-southern"], creature.availability["month-northern"])}
    //                  </span>
    //              </section>
    //              <span className={style.flexed}>
    //                  <img src={MoneyIcon} alt="" />
    //                  <h2>It goes for {creature.price}  </h2>
    //                  <img src={checkPrice(creature.price)} alt="" />
    //              </span>
	// 		</div>
	// 		<div className={`${style.cardFace}  ${style.cardFaceBack}`}>
	// 			<div className={style.cardContent}>
	// 				<div className={style.cardHeader}>
						
	// 					<h2>Tyler Potts</h2>
	// 				</div>
	// 				<div className={style.cardBody}>
	// 					<h3>JavaScript Wizard</h3>
	// 					<p>Lorem ipsum <strong>dolor</strong> sit amet, consectetur <strong>adipiscing</strong> elit. Sed id erat a magna lobortis dictum. Nunc est arcu, <strong>lacinia</strong> quis sapien placerat, <strong>laoreet</strong> tincidunt nulla.</p>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>
        <div className={style.seacardwrapper}>
            <section >
                <article className={style.iconholder}>
                    <img src={creature.image_uri} alt="The creature" />
                </article>
                <h1>{creature.name["name-USen"].charAt(0).toUpperCase() + creature.name["name-USen"].slice(1)}</h1>
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
                        <div className={style.back}>
                            <span className={style.flexed}> <img src={MegaIcon} alt="" /><h2>Catchphrase: "{creature["catch-phrase"]}"</h2></span>
                            <span className={style.flexed}><img src={SpeedIcon} alt="" /><h2>Speed: {creature.speed}</h2> </span>
                            <span className={style.flexed}><img src={ShadowIcon} alt="" /><h2>Shadow: {creature.shadow}</h2> </span>
                            <span className={style.flexed}><img src={OwlIcon} alt="" /><h2>Museumphrase: {creature["museum-phrase"]}</h2> </span>
                        </div>
                   
                        :
                        ''
                }
                <h1 onClick={()=>setShowMore(!showMore)}> {showMore ? 'Show less' : 'Show more'}</h1>

            </section>


        </div>
    )
}
export default SeacreatureCard;