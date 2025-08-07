import { useEffect, useState, useRef, createContext, useContext } from 'react';
import { getIdAccount } from '../api/Account';
import Lottie from "lottie-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

import { ThemeProvider } from '../component/ThemeContext.jsx';
import Navbar from '../component/Navbar.jsx';
import NavChat from '../component/NavChat.jsx';


import listen from '../assets/images/listen.png';
import listenerProfile from '../assets/images/listenerProfile.jpg';
import talker from '../assets/images/talk.png';
import talkerProfile from '../assets/images/talkerProfile.jpg';
import '../css/chatUser.css';
import matching from '../assets/icons/Animation-matching.json';
import chatAnimation from '../assets/icons/Animation-Chat.json';
import { FaCloudMoonRain } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { BsSend } from "react-icons/bs";

const API = import.meta.env.VITE_API_URL;


const RoleContext = createContext();

export default function ChatUser() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: false,
        });

        window.scrollTo(0, 0);

        getIdAccount().then(setUserId);
    }, []);

    const [systemState, setSystemState] = useState('');
    const [role, setRole] = useState(null);
    const [roomid, setRoomId] = useState(null);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef(null);
    const bottomChatRef = useRef(null);

    useEffect(() => {
        const audio = new Audio('/ChatPopSound.mp3');
        audio.volume = 0.5;
        if (chat.length > 0) {
            audio.play().catch((err) => console.error('เล่นเสียงไม่ได้:', err));
        }
    }, [chat]);


    const chatCardData = [

        {
            aos: "zoom-in-left",
            class: "userTalker",
            img: talker,
            title: "ผู้เล่าเรื่อง",
            icon: <FaCloudMoonRain size={30} />,
            info: "&nbsp;&nbsp;คุณคือผู้เล่าเรื่อง สามารถแบ่งปันสิ่งที่อยู่ในใจของคุณออกมาได้อย่างอิสระ โดยไม่ต้องกังวลว่าจะถูกตัดสินเพราะคุณมีเพื่อนรับฟังเป็นพื้นที่ปลอดภัยของคุณ :)",
            role: "talker"
        },
        {
            aos: "zoom-in-right",
            class: "userListen",
            img: listen,
            title: "เพื่อนรับฟัง",
            icon: <CiSun size={30} />,
            info: "&nbsp;&nbsp;คุณคือเพื่อนรับฟังด้วยความเข้าใจ เปิดใจรับฟังผู้เล่าเรื่องของคุณโดยไม่ตัดสินหรือแทรกแซงผู้เล่าเรื่องของคุณมากเกินไป คุณคือพื้นที่ปลอดภัยของผู้เล่าเรื่องนะ :)",
            role: "listener"
        }
    ]

    useEffect(() => {
        if (role) {
            //สร้าง Socket
            socketRef.current = io(API);

            //ส่ง event ลงทะเบียนเข้า queue
            socketRef.current.emit('register', role);

            //รอฟัง event matched
            socketRef.current.on('matched', (roomId) => {
                setRoomId(roomId);
                setSystemState('matched');
            });

            //คู่สนทนาตัดการเชื่อมต่อ
            socketRef.current.on('chatDisconnected', () => {
                socketRef.current.disconnect();
                setSystemState('');
                setRole(null);
                setRoomId(null);
                setChat([]);
            });

            //รอฟัง event receiveMessage
            socketRef.current.on('receiveMessage', ({ message, sender, time, role }) => {
                setChat(prev => [...prev, { message, sender, time, role }]);
            });

            //เมื่อ Component ถูกทำลาย หรือค่า role เปลี่ยน
            return () => {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSystemState('');
                setRole(null);
                setRoomId(null);
                setChat([]);
            };
        }
    }, [role]);


    //ฟังก์ชั่นกดตรงข้อความ
    const sendMessage = () => {
        if (message.trim() !== '') {
            const timeChat = new Date();
            const hours = timeChat.getHours();
            const minutes = timeChat.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes} น.`;

            //ส่ง event sendMessages
            socketRef.current.emit('sendMessage', ({ roomId: roomid, message: message, time: timeString, role: role }));
            setChat(prev => [...prev, { message, sender: 'me', time: timeString, role }]);
            setMessage('');
        }
    }

    useEffect(() => {
        if (bottomChatRef.current) {
            bottomChatRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat]);

    const matchedButton = (role) => {
        if (userId) {
            setSystemState('matching');
            setRole(role);
        }
        else{
            toast.error('ต้องเข้าสู่ระบบก่อนนะครับ :)');
        }
    }


    return (
        <>
            <ThemeProvider>
                <RoleContext.Provider value={{ role, setRole }}>
                    {systemState !== 'matched' ? <Navbar /> : <NavChat />}
                    {systemState === '' &&
                        <div className="roleZone" >
                            <div className="roleSection">
                                <div className='roleTitle' data-aos='zoom-in'><p>เธออยากเป็นบทบ</p><p>าทไหนหรอ ?</p></div>
                                <div className="roleType" >

                                    {chatCardData.map((data, index) => (
                                        <div data-aos={data.aos} key={index} className='Aos'>
                                            <div className={`roleCard ${data.class}`}>
                                                <div className={`${data.class}img`}>
                                                    <img src={data.img} />
                                                </div>
                                                <div className={`${data.class}title roletitle`}>
                                                    <p> {data.title} </p>
                                                    {data.icon}
                                                </div>
                                                <p className={`roleinfo`} dangerouslySetInnerHTML={{ __html: data.info }}></p>
                                                <Link to={''} style={{ textDecoration: 'none' }} className={`${data.class}Button`}>
                                                    <button onClick={() => matchedButton(data.role)}>เริ่มจับคู่</button>
                                                </Link>

                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    }
                    {systemState === 'matching' &&

                        <div className='matchZone' data-aos='fade-up'>
                            <Lottie animationData={matching} loop={true} autoplay={true} className='matchingImg' />
                            <p >กำลังหา{role === 'talker' ? 'ผู้รับฟัง' : 'ผู้ระบาย'}ให้อยู่น้าา รอหน่อยนะค้าบบ :)</p>
                            <button onClick={() => { 
                                setSystemState(''),
                                setRole(null),
                                socketRef.current.emit('endChat');
                                 }} > ยกเลิกการจับคู่ </button>
                        </div>

                    }
                    {systemState === 'matched' &&
                        <div className="matchedZone">
                            <div className="matchedSection">
                                <div className="matchedLeftSection" data-aos='fade-right'>
                                    <p> พูดคุยกันอย่างสุภาพนะ :) </p>
                                    <Lottie animationData={chatAnimation} loop={true} autoplay={true} className='leftAnimation' />
                                </div>
                                <div className="matchedRightSection" data-aos='fade-left'>
                                    <div className="rightTitle">
                                        <p>{role === 'listener' ? "คุณเป็นเพื่อนรับฟัง กรุณาเปิดใจรับฟัง โดยไม่ตัดสิน ซ้ำเติม ผู้เล่าเรื่องของคุณ 🤍" : "คุณเป็นผู้เล่าเรื่อง สามารถเล่าสิ่งที่อยู่ในใจออกมาได้เลยนะ 🤍"}</p>
                                    </div>
                                    <div className="rightCardChat">
                                        <p className='rightRole'>{role === 'listener' ? "เพื่อนรับฟัง" : "ผู้เล่าเรื่อง"}</p>
                                        <div className="rightCardLine"></div>
                                        <div className="messageZone">
                                            <div className="mt"></div>
                                            {chat.map((item, i) => (
                                                <div className={`chatInfo ${item.sender}`} key={i}>
                                                    <div className={`textDetail${item.sender}`}>
                                                        <div className='textChat'><p>{item.message}</p></div>
                                                        <p className='timeChat'>{item.time}</p>
                                                    </div>
                                                    <img src={item.role === 'listener' ? listenerProfile : talkerProfile} alt="" />
                                                </div>
                                            ))}

                                            <div ref={bottomChatRef} />
                                        </div>
                                        <div className="rightInput">
                                            <textarea rows={1} placeholder='พิมพ์ข้อความ. . . .'
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={async (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        sendMessage();
                                                    }
                                                }}>
                                            </textarea>
                                            <BsEmojiSmile size={27} className='InputButton' />
                                            <BsSend size={27} className='InputButton' onClick={() => sendMessage()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </RoleContext.Provider>
            </ThemeProvider >
        </>
    )
}

function useRole() {
    return useContext(RoleContext);
}

export { useRole };