import '../css/Navbar.css'
import '../css/theme.css'
import { CiHeart } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { useRole } from './ChatUser';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // ต้อง import css
import { useEffect, useState, useRef, createContext, useContext } from 'react';
import socket from '../socket.js';

export default function NavChat() {
    const { setRole } = useRole();
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = socket;
     }, [])


    const handleExit = () => {
        confirmAlert({
            title: 'จบการสนทนา',
            message: 'บอกลาคู่สนทนาของคุณแล้วใช่มั้ย ?',
            buttons: [
                {
                    label: 'ใช่',
                    onClick: () => {
                        socketRef.current.emit('endChat');
                        setRole('');
                    }
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

