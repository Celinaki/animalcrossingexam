import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styling/Footer.module.scss';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollUp=()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling behavior
    });

}
  return (
    <div className={styles.footerWrap}>
      <section className={styles.contentHolder}>
        <NavLink 
     onClick={scrollUp}
        to="/" className={styles.navLink} activeClassName="">
          Home
        </NavLink>
        <NavLink 
        onClick={scrollUp}
        to="/about" className={styles.navLink} activeClassName="">
          About
        </NavLink>

        <p>&copy; {currentYear} Celina | All Rights Reserved</p>
      </section>
    </div>
  );
};

export default Footer;
