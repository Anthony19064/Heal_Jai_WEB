import { ThemeProvider } from '../component/ThemeContext.jsx';
import Navbar from '../component/Navbar.jsx';
import AllPost from '../component/AllPost.jsx';
import Themebutton from '../component/Themebutton.jsx';
import Footer from '../component/Footer.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function Community() {
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
      <AllPost />
      <Themebutton />
      <Footer />
    </ThemeProvider>
    </>
  );
}
