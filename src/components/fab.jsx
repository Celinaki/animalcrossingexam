import React from "react";
import { useState } from "react";
const Fab = () =>{

    const [visible, setVisible] = useState(false)
  
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 400){
        setVisible(true)
      } 
      else if (scrolled <= 400){
        setVisible(false)
      }
    };
    
    const scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    };
    
    window.addEventListener('scroll', toggleVisible);
    return(
        <div style={{background:"#1a181821",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"50%",
        width:"50px",
        height:"50px",
        position:"sticky",
        bottom:"0",
        top:"100",
        right:"0",
        left:"100%",
        cursor:"pointer",
        display: visible ? 'flex' : 'none'

        }}
        title="Take me up!" onClick={scrollToTop}>
            <span class="material-symbols-outlined" style={{display: visible ? 'inline' : 'none'}}>
            expand_less
            </span>
        </div>
    )
}
export default Fab