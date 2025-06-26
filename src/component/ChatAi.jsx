import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ThemeProvider } from '../component/ThemeContext.jsx';
import Navbar from '../component/Navbar.jsx';
import Themebutton from '../component/Themebutton.jsx';


export default function ChatAi() {
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
                <h1> Chat Ai kub</h1>
                <Themebutton />
            </ThemeProvider>
        </>
    )
}