import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ThemeProvider } from '../component/ThemeContext.jsx';
import Navbar from '../component/Navbar.jsx';
import Themebutton from '../component/Themebutton.jsx';


export default function Diary() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
        });
    });

    return (
        <>
            <ThemeProvider>
                <Navbar />
                <center> <p>ยังไม่ได้ทำค้าบ ซอรี่ </p> </center>
                <Themebutton />
            </ThemeProvider>
        </>
    )
}