import useSound from 'use-sound';
import styles from '../styling/Songcard.module.scss'
import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import AudioPlayer from './AudioPlayer';
import checkPrice from '../functions/CheckPrice';

const Songcard = (song) => {
  const thesong = song.song;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(thesong.music_uri));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => { });
      audio.removeEventListener('timeupdate', () => { });
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    audio.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audio.volume = e.target.value;
  };

  const [hover,setHover]=useState(false)

  return (
    <div className={styles.songcardwrapper}
    onMouseEnter={()=>setHover(true)} 
    onMouseLeave={()=>setHover(false)}>
      <section className={styles.imageandplayer}>
        <img 
      className={styles.songcover}
      src={thesong.image_uri} alt="The cover of the song " /> 
      {hover? 
            <AudioPlayer src={thesong.music_uri} />

      :''} 

      </section>
   
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
      <span  className={styles.priceandimg}>
        {thesong['sell-price'] === null ?
          <p>Sell price: Oops seems like we couldn't find the price.</p>
          :
          <>
            <p>Buy price : {thesong['sell-price']}
            </p>
            <img src={checkPrice(thesong['sell-price'])} alt="" />
          </>
        }
      </span>
      {/* <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <p>
        {Math.floor(currentTime)} / {Math.floor(duration)}
      </p>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />
      <p>Volume: {volume}</p>
      <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} /> */}
    </div>
  )
}
export default Songcard;