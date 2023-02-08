import useSound from 'use-sound';
import { useState , useEffect} from 'react';
import { Howl } from 'howler';
import AudioPlayer from './AudioPlayer';

const Songcard = (song)=>{
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
          audio.removeEventListener('loadedmetadata', () => {});
          audio.removeEventListener('timeupdate', () => {});
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


    return(
        <div>
            <h1>{thesong.name["name-USen"]}</h1>
            <AudioPlayer src={thesong.music_uri}/>
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