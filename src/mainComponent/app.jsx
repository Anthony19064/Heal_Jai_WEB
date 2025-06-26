import { ThemeProvider } from '../component/ThemeContext.jsx';
import Navbar from '../component/Navbar.jsx';
import WelcomeSection from '../component/WelcomeSection.jsx';
import Mood from '../component/mood.jsx';
import FeatureSection from '../component/FeatureSection.jsx';
import Footer from '../component/Footer.jsx';
import Themebutton from '../component/Themebutton.jsx'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';



export default function App() {
  useEffect(() => {
  AOS.init({
    duration: 700,
    once: false, 
  });

  AOS.refresh();
  });
  return (
    <>
    <ThemeProvider>
      <Navbar />
      <WelcomeSection />
      <FeatureSection />
      <Mood />
      <Footer />
      <Themebutton />
    </ThemeProvider>
    </>
  );
}
