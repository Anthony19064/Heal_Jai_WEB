import '../css/Navbar.css'
import '../css/theme.css'
import { CiHeart } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { useRole } from './ChatUser';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // ต้อง import css

export default function NavChat() {
    const { setRole } = useRole();

    const handleExit = () => {
        confirmAlert({
            title: 'จบการสนทนา',
            message: 'บอกลาคู่สนทนาของคุณแล้วใช่มั้ย ?',
            buttons: [
                {
                    label: 'ใช่',
                    onClick: () => setRole('')
                },
                {
                    label: 'ไม่',
                }
            ]
        });
    };

    return (
        <>
            <div className='NavZone'>
                <nav className="navbar" data-aos="fade-down">
                    <ul>
                        <p className="logo logoChat" >HealJai<CiHeart className='iconHeart' size={50} /></p>
                    </ul>
                    <ul className='rightSection'>
                        <button className='endChat' onClick={handleExit}> จบการสนทนา <IoMdExit size={23} color='#FFFFFF' className='exitIcon' /></button>
                    </ul>

                </nav>
            </div>
        </>
    )
}

