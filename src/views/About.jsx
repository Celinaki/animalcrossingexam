import NavWave from "../components/NavWave"
import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import Footer from "../components/Footer"
import Aos from "aos"
import style from '../styling/AboutPage.module.scss'
import { useEffect } from "react"
const AboutPage = () =>{
useEffect(()=>{
  
    window.scrollTo({
      top: 300,
      behavior: 'smooth' 
    });
})
    return(
    <>
       <Navbar/>
       <NavWave/>
       <div className={style.aboutwrapper}>

        <h1  data-aos="fade-right">Hi, welcome!</h1>
        <p 
         data-aos="fade-right"
         data-aos-delay="200"
         data-aos-easing="ease-in"
         data-aos-duaration="100"
        >
        This website is a project I have chosen for my thesis work. 
        I chose to work with an  <a href="https://acnhapi.com/doc">Animal Crossing API</a> and use it to create a web page inspired by Animal Crossing: New Horizons.
          Animal Crossing is a game I have had since childhood and it has always been a cozy and relaxing game that makes me feel good. Therefore, I decided to build a website with information about what I consider to be the most important items in the game. 
          </p>
          <p
           data-aos="fade-right"
           data-aos-delay="300"
           data-aos-easing="ease-in"
           data-aos-duaration="100"
          >This project is solely for the purpose of a school project and not for any promotional purposes.</p>
          <p  data-aos="fade-right"
         data-aos-delay="400"
         data-aos-easing="ease-in"
         data-aos-duaration="100">I hope you find the website enjoyable and useful.

        If you have any questions or feedback, please feel free to contact me at email.</p>
      
        <p style={{textAlign:"center"}}
         data-aos="fade-up"
         data-aos-delay="300"
         data-aos-easing="ease-in"
         data-aos-duaration="100">Thank you for reading!</p>
        
        
       </div>
       <Footer/>

    </>
    )
}
export default AboutPage