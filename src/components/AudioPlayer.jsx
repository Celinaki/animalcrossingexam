import React, { useState, useEffect } from 'react';
import Style from '../styling/AudioPlayer.module.scss';
import { ImPause , ImPlay2} from "react-icons/im";



let globalAudio;

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(src));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    audio.volume = 0.4;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
  audio.addEventListener('pause', () => {
    setIsPlaying(false);
  });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('pause', () => {});

    };
  }, [audio]);

  const togglePlay = () => {
    if (globalAudio && globalAudio !== audio) {
      globalAudio.pause();
      setIsPlaying(false)
    }
  
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);

    } else {
      audio.play();
      setIsPlaying(true);

    }
    //setIsPlaying(!isPlaying);
    globalAudio = audio;
  };
  

  const handleSeek = (e) => {
    audio.currentTime = e.target.value;
  };

//   const handleVolume = (e) => {
//     setVolume(e.target.value);
//     audio.volume = e.target.value;
//   };

  return (
    <div className={Style.audiowrapper}>
     
<span className={Style.audioduration}> <button onClick={togglePlay}>
        {isPlaying ? <ImPause/> : 
        <ImPlay2/>}</button>
      <p style={{fontWeight:600}}>{Math.floor(currentTime)} </p>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        style={{backgroundColor:"red", color:"red"}}
      />
      <p style={{fontWeight:600}}>{Math.floor(duration)}</p>
</span>


      <p  style={{fontWeight:600}}>Volume: {volume}</p>
      {/* <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} /> */}
    </div>
  );
};

export default AudioPlayer;
