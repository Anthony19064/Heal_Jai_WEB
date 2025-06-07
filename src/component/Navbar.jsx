import '../css/Navbar.css'
import '../css/theme.css'
import profile from '../assets/images/mockup.png';
import { CiHeart } from "react-icons/ci";
import notification from '../assets/icons/notification.svg';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { getOwnerAccount } from '../api/Account.js';
import { handleLogout } from '../api/Auth.js';

export default function Navbar() {
    const [userinfo, setUserinfo] = useState(null);
    useEffect(() => {
        getOwnerAccount().then(setUserinfo)
    }, []);





    const [NavPopup, setNavPopup] = useState(false);

    const OpenPopup = () => {
        setNavPopup(!NavPopup);
    }


    return (
        <>
            <div className='NavZone'>
                <nav className="navbar" data-aos="fade-down">
                    <ul>
                        <Link to={"/"} style={{ textDecoration: 'none' }}>
                            <p className="logo" >HealJai Mini <CiHeart className='iconHeart' size={50} /></p>
                        </Link>
                    </ul>
                    <ul className='rightSection'>
                        <div className='notification' id='notification'>
                            <div className="dotnoti"></div>
                            <img className='notiicon' src={notification}></img>
                        </div>

                        {userinfo ? (
                            <img className="imguser" src={userinfo.photoURL} onClick={OpenPopup}></img>
                        ) : (
                            <Link to={'/login'}>
                                <img className="imguser" src={profile}></img>
                            </Link>
                        )}


                    </ul>

                    {NavPopup && (
                        <div className="NavPopup" data-aos="fade-up" id="NavPopup">
                            <Link to={`/profile/${userinfo ? userinfo.displayName : ''}`} className="Popupitem" style={{ textDecoration: 'none' }}>
                                โปรไฟล์ของฉัน
                            </Link>
                            <Link to="/contractUs" className="Popupitem" style={{ textDecoration: 'none' }}>
                                ติดต่อเรา
                            </Link>
                            <div className="Popupitem" onClick={() => handleLogout()}>ออกจากระบบ</div>
                        </div>
                    )}
                </nav>
            </div>
        </>
    )
}

