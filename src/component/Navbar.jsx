import '../css/Navbar.css'
import '../css/theme.css'
import profile from '../assets/images/mockup.png';
import { CiHeart } from "react-icons/ci";
import notification from '../assets/icons/notification.svg';
import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar() {
    const navigate = useNavigate();

    const [userinfo, setUserinfo] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
        if (user) {
            setUserinfo(user);
        } else {
            setUserinfo(null);
        }
    }, []);


    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            toast.success('ออกจากระบบเรียบร้อยครับ :)');
            window.location.href = '/';
        } catch (error) {
            console.error("❌ Logout failed:", error);
        }
    };


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

