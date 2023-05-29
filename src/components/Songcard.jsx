import useSound from 'use-sound';
import styles from '../styling/Songcard.module.scss'
import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import AudioPlayer from './AudioPlayer';
import checkPrice from '../functions/CheckPrice';
import { useLocation } from 'react-router-dom';

const Songcard = (song) => {
  const thesong = song.song;


  const [hover, setHover] = useState(false)

  return (
    <div className={styles.songcardwrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-aos="fade-right"
      data-aos-delay="50"
      data-aos-easing="ease-in"
      data-aos-duaration="50"
      >
      <section className={styles.imageandplayer}>
        <span className={styles.imageholder}>
          <img
            src={thesong.image_uri} alt="The cover of the song " />
        </span>
        {/* {hover && */}
          <AudioPlayer src={thesong.music_uri} hover={hover} />
        {/* } */}

      </section>

<section className={styles.textsection}>
      <h2>{thesong.name["name-USen"]}</h2>
      <span className={styles.priceandimg}>
        {thesong['buy-price'] === null ?
          <p>Buy price: Oops seems like we couldn't find the price.</p>
          :
          <>
            <p>Buy price : {thesong['buy-price']}
            </p>
            <img src={checkPrice(thesong['buy-price'])} alt="" />
          </>
        }

      </span>
      <span className={styles.priceandimg}>
        {thesong['sell-price'] === null ?
          <p>Sell price: Oops seems like we couldn't find the price.</p>
          :
          <>
            <p>Sell price : {thesong['sell-price']}
            </p>
            <img src={checkPrice(thesong['sell-price'])} alt="" />
          </>
        }
      </span></section>
    </div>
  )
}
export default Songcard;