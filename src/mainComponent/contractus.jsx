import '../css/Contractus.css'

import { FaHeart } from "react-icons/fa";
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '../component/ThemeContext.jsx';
import { useEffect, useState } from 'react';

import Navbar from '../component/Navbar.jsx';
import Themebutton from '../component/Themebutton.jsx'
import Footer from '../component/Footer.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Contractus() {

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
        });
    });

    useEffect(() => {
        const container = document.getElementById('background-circles');


        const createCircle = () => {
            const circle = document.createElement('div');
            circle.className = 'circle';


            const left = Math.random() * 100;
            const sizes = Math.random() * 20 + 30;
            const colors = `hsl(${Math.random() * 360}, 70%, 70%)`;


            circle.style.left = `${left}%`;
            circle.style.width = `${sizes}px`;
            const root = createRoot(circle);
            root.render(<FaHeart style={{ color: colors }} size={sizes} />);

            container.appendChild(circle);

            setTimeout(() => {
                container.removeChild(circle);
            }, 5000); // ลบหลัง 5 วิ
        };

        const interval = setInterval(createCircle, 500); // ทุก 0.5 วิ

        return () => clearInterval(interval); // cleanup ตอน unmount
    }, []);


    return (
        <>
            <ThemeProvider>
                <Navbar />
                <div id="background-circles"></div>
                <Themebutton />
            </ThemeProvider>

        </>
    );
}
