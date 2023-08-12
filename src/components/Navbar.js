import React,{useState} from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const navigate= useNavigate();

    const logoutHandler=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
    }

    const toggleMenu = () => {
      setMenuActive(!menuActive);
    };
  
    const isLoggedIn= !!localStorage.getItem('token');
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <div className={styles.navbarTitle}>Expense Tracker</div>
      </div>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
      <span className={styles.hamburgerIcon}><BiMenu/></span>
    </button>
      <ul className={`${styles.navbarNav} ${menuActive ? styles.active : ''}`}>
        <li className={styles.navItem}><Link to="/home" className={styles.navLink}>Home</Link></li>
        <li className={styles.navItem}><Link to="/profile" className={styles.navLink}>Profile</Link></li>
        {!isLoggedIn&& <li className={styles.navItem}><Link to="/login" className={styles.navLink}>Login</Link></li>}
        <li className={styles.navItem}><button  className={styles.navLink} onClick={logoutHandler}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
