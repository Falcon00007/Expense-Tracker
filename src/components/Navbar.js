import React,{useState,useContext} from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenu,BiSolidHome,BiSolidUser,BiLogIn,BiLogOut,BiNotepad } from "react-icons/bi";
import AuthContext from '../store/auth-context';

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const authCtx= useContext(AuthContext);
    const isLoggedIn= authCtx.isLoggedIn;
    const navigate= useNavigate();

    const logoutHandler=()=>{
        authCtx.logout();
        navigate('/login');
    }

    const toggleMenu = () => {
      setMenuActive(!menuActive);
    };
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <div className={styles.navbarTitle}>Expense Tracker</div>
      </div>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
      <span className={styles.hamburgerIcon}><BiMenu/></span>
    </button>
      <ul className={`${styles.navbarNav} ${menuActive ? styles.active : ''}`}>
        <li className={styles.navItem}><Link to="/home" className={styles.navLink}><p><BiSolidHome/></p> Home</Link></li>
        <li className={styles.navItem}><Link to="/profile" className={styles.navLink}><p><BiSolidUser/></p> Profile</Link></li>
        {!isLoggedIn&& <li className={styles.navItem}><Link to="/login" className={styles.navLink}><p><BiLogIn/></p> Login</Link></li>}
        {isLoggedIn&& <li className={styles.navItem}><Link to="/expense" className={styles.navLink}><p><BiNotepad/></p> Expenses</Link></li>}
        {isLoggedIn&& <li className={styles.navItem}><button  className={styles.navLink} onClick={logoutHandler}><p><BiLogOut/></p> Logout</button></li>}
        </ul>
    </nav>
  );
};

export default Navbar;
