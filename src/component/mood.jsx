import '../css/mood.css';
import '../css/theme.css';
import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import stress from '../assets/icons/Animation - 1747638906142.json'
import sad from '../assets/icons/Animation - 1747638873056.json'
import happy from '../assets/icons/Animation - 1747639008997.json'
import normal from '../assets/icons/Animation - 1747638950145.json'
import angry from '../assets/icons/Animation - 1747638918123.json'

import MoodStat from './moodstat';
import MoodCalendar from './moodcalendar';

import { toast } from 'react-toastify';
import { addMood, updateDayStack } from '../api/mood';
import { getIdAccount } from '../api/Account';

export default function Mood() {

    const [rightInfo, setRighinfo] = useState('stat'); //เนื้อหาฝั่งขวา
    const [selectedIndex, setSelectedIndex] = useState(null); //index ของ MoodItem
    const [userMood, setUserMood] = useState(''); // Mood ที่ User เลือก
    const [moodValue, setmoodValue] = useState(''); // Mood ที่ User เลือก
    const [userText, setUserText] = useState(''); // Text ทื่ User พิมพ์
    const [refresh, setrefresh] = useState(false);


    const [userId, setUserId] = useState(null);
    useEffect(() => {
        getIdAccount().then(setUserId)
    });

    const today = new Date();

    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: '2-digit'
    };

    const formatted = today.toLocaleDateString('th-TH', options);


    const moodObject = [
        {
            emoji: sad,
            text: 'เศร้า',
            class: 'sad',
            value: 'sadDay'
        },
        {
            emoji: happy,
            text: 'มีความสุข',
            class: 'happy',
            value: 'happyDay'
        },
        {
            emoji: normal,
            text: 'เฉยๆ',
            class: 'normal',
            value: 'normalDay'
        },
        {
            emoji: angry,
            text: 'โกธร',
            class: 'angry',
            value: 'angryDay'
        },
        {
            emoji: stress,
            text: 'เครียด',
            class: 'stress',
            value: 'stressDay'
        },

    ]

    const SubmitMood = async (e) => {
        e.preventDefault();

        if (userId) {
            const data = await addMood(userId, userMood, userText, moodValue);

            if (data.success) {
                await updateDayStack(userId)
                setSelectedIndex(null);
                setUserText('');
                toast.success(data.message);
                setrefresh(prev => !prev);
            }
            else {
                setSelectedIndex(null);
                setUserText('');
                toast.error(data.message);
            }
        }
        else {
            setSelectedIndex(null);
            setUserText('');
            toast.error('ต้องเข้าสู่ระบบก่อนนะครับ :)');
        }
    }



    return (
        <>
            <div className='MoodZone'>
                <div className="moodSection" data-aos='fade-down'>
                    <p className="moodTitle">บันทึกอารมณ์ประจำวัน</p>
                    <div className="moodDay"><p>{formatted}</p></div>
                    <div className="moodInfo">
                        <form className="infoLeft" onSubmit={SubmitMood}>
                            <p className="todayTitle">
                                วันนี้รู้สึกยังไงบ้าง
                            </p>
                            <div className="moodSelect">
                                {moodObject.map((item, index) => (
                                    <div key={index}
                                        className={`moodOption ${item.class}border ${selectedIndex === index ? 'active' : ''}`}
                                        onClick={() => { setSelectedIndex(index), setUserMood(item.value), setmoodValue(item.class) }}>
                                        <Lottie animationData={item.emoji} loop={true} autoplay={true} className={`emoji ${item.class}`} />
                                        <p className='titleOption'>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            <textarea name="moodnote" id="moodnote" className="moodnote" placeholder='ทำไมถึงรู้สึกแบบนี้หรอ บอกเราได้นะ' value={userText} onChange={(e) => setUserText(e.target.value)}></textarea>
                            <button className="moodsubmit" type='submit'><p>บันทึก</p></button>
                        </form>
                        {rightInfo === 'stat' && <MoodStat onChangePage={() => setRighinfo('calendar')} userId={userId} refreshState={refresh} />}
                        {rightInfo === 'calendar' && <MoodCalendar onChangePage={() => setRighinfo('stat')} userId={userId} refreshState={refresh} />}

                    </div>
                </div>
            </div>
        </>
    )
}