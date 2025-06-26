import { ThemeProvider } from '../component/ThemeContext.jsx';
import Navbar from '../component/Navbar.jsx';
import Themebutton from '../component/Themebutton.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';

import '../css/chat.css';
import chatUser from '../assets/icons/Animation-UserChat.json';
import chatAi from '../assets/icons/Animation-AiChat.json';


export default function Chat() {
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
        });

       window.scrollTo(0, 0);
    }, []);

    const chatCardData = [
        {
            aos: "zoom-in-right",
            class: "chatUser",
            img: chatUser,
            title: "แชทกับผู้ใช้อื่น",
            info: " &nbsp;&nbsp;เป็นการแชทแบบไม่ระบุตัวตนเธอสามารถพูดสิ่งที่อยู่ในใจออกมาได้เลยนะ เธอสามารถเลือกได้นะว่าอยากเป็นผู้ระบาย หรือ ผู้รับฟัง :) ",
            path: "/chatWithUser"
        },
        {
            aos: "zoom-in-left",
            class: "chatAi",
            img: chatAi,
            title: "แชทกับ Ai ประจำเว็บไซต์",
            info: " &nbsp;&nbsp;เป็นการแชทกับ Ai ที่ทางเราเตรียมมาให้เป็นเพื่อนคุยเล่นกับทุกคน โดยเราจะไม่เก็บประวัติการแชทใดๆของคุณ ",
            path: "/chatWithAi"
        }
    ]


    return (
        <>
            <ThemeProvider>
                <Navbar />


                <div className="chatZone" >
                    <div className="chatSection">
                        <span className='sectionTitle' data-aos='zoom-in'><p>เธออยากพูดคุ</p><p>ยแบบไหนหรอ ?</p></span>
                        <div className="chatType" >

                            {chatCardData.map((data, index) => (
                                <div data-aos={data.aos} key={index} className='Aos'>
                                    <div className={`chatCard ${data.class}`}>
                                        <Lottie animationData={data.img} loop={true} autoplay={true} className={`${data.class}Img`} />
                                        <p className={`${data.class}title`}> {data.title} </p>
                                        <p className={`${data.class}Info`} dangerouslySetInnerHTML={{ __html: data.info }}></p>
                                        <Link to={data.path} style={{ textDecoration: 'none' }} className={`${data.class}Button`}>
                                            <button >เริ่มแชท</button>
                                        </Link>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>


                <Themebutton />
            </ThemeProvider>
        </>
    )
}