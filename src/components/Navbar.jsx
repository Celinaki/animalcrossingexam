import style from '../styling/Navbar.module.scss'
import { NavLink } from 'react-router-dom'
const Navbar = () => {

    return(
        <div className={style.navwrapper}>
            <NavLink to={'/villagers'} style={{color:'inherit', textDecoration:"none"}}>
             <h1>ANIMAL CROSSING NEW HORIZON</h1>
             </NavLink>
        </div>
    )
}

export default Navbar