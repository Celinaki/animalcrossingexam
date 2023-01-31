import useSound from 'use-sound';
import { useState } from 'react';
import { Howl } from 'howler';

const Songcard = (song)=>{
    const thesong = song.song;
    const [songIsPlaying,setSongIsPlaying ] = useState(false)

    const audi = new Audio(thesong.music_uri)

    function playSong(){

        if(songIsPlaying === false){
        setSongIsPlaying(true)
        audi.play()
            setSongIsPlaying(true)
        }
        else{
        audi.pause()            
        setSongIsPlaying(false)
        
        }
         
    }
    const [ playSound ] = useSound(thesong.music_uri)

    const playTheSong=(src)=>{
        const music = new Howl({
            src,
            html5:true
        })
  
   return music.playing() ? music.pause() : music.play();    }


    return(
        <div>
            <h1>{thesong.name["name-USen"]}</h1>
            <h1 onClick={() => playSong()}>play sound</h1>
            <button onClick={()=> playTheSong(thesong.music_uri)}>
                Play!
            </button>
        </div>
    )
}
export default Songcard;