import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


import Navbar from '../component/Navbar.jsx';
import MyProfile from "../component/MyProfile.jsx";
import OtherProfile from "../component/OtherProfile.jsx";
import Footer from "../component/Footer.jsx";
import { ThemeProvider } from '../component/ThemeContext.jsx';
import Themebutton from '../component/Themebutton.jsx'

import AOS from 'aos';
import 'aos/dist/aos.css';



export default function Profile() {
    useEffect(() => {
      AOS.init({
        duration: 700,
        once: false, // animate ทุกครั้ง
      });
    
      AOS.refresh();
    }, []);

    const { username } = useParams();
    const [userinfo, setUserinfo] = useState(null);
    let profileContent = null;


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

        if (user) {
            setUserinfo(user);
        } else {
            console.log("User is not logged in");
        }
    }, []);

    if (userinfo) {
        if (username === userinfo.displayName) {
            profileContent = <MyProfile />;
        }
        else {
            profileContent = <OtherProfile otherUsername={username} />;  //component ผู้ใช้คนอื่นในอนาคต 
        }
    }

    return (
        <>
            <ThemeProvider>
                <Navbar />
                {profileContent}
                <Footer />
                <Themebutton />
            </ThemeProvider>

        </>
    );
}
