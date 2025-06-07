import Lottie from "lottie-react";
import stress from '../assets/icons/Animation - 1747638906142.json'
import sad from '../assets/icons/Animation - 1747638873056.json'
import happy from '../assets/icons/Animation - 1747639008997.json'
import normal from '../assets/icons/Animation - 1747638950145.json'
import angry from '../assets/icons/Animation - 1747638918123.json'

import '../css/moodcalendar.css';

import { VscGraphLine } from "react-icons/vsc";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

import { generateCalendar } from "../api/moodcalendar";
import { getMymood } from "../api/moodcalendar";
import { nextMonth } from "../api/moodcalendar";
import { prevMonth } from "../api/moodcalendar";

export default function MoodCalendar({ onChangePage, userId, refreshState }) {

    const dayMini = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    const monthNamesTH = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const [thisMonth, setThismonth] = useState(new Date().getMonth());
    const [thisYear, setTthisYear] = useState(new Date().getFullYear());
    const monthText = monthNamesTH[thisMonth];
    const toDay = new Date();
    const [moodObj, setMoodObj] = useState([])
    const calendarObject = generateCalendar(thisMonth + 1, thisYear);

    useEffect(() => {
        if (userId) {
            getMymood(userId, thisMonth, thisYear).then(setMoodObj);
        }
    }, [thisMonth, thisYear, userId, refreshState])






    return (
        <>
            <div className="infoRight" data-aos='fade-left' data-aos-duration="1000">
                <div className="innerInfo">
                    <div className="topcalendarSection">
                        <button className="iconarrowLeft" role="button" onClick={() => prevMonth(thisMonth, thisYear, setThismonth, setTthisYear)} > <FaArrowCircleLeft size={25} style={{ color: 'var(--secondtext-color)',transition: 'color 0.7s ease-in-out' }} /></button>
                        <p className="monthCalendar">{`${monthText} ${thisYear + 543}`}</p>
                        <button className="iconarrowRight" role="button" onClick={() => nextMonth(thisMonth, thisYear, setThismonth, setTthisYear)} > <FaArrowCircleRight size={25} style={{ color: 'var(--secondtext-color)',transition: 'color 0.7s ease-in-out' }} /></button>
                    </div>

                    <div className="DateCalendar">
                        {dayMini.map((item, index) =>
                            <p className="Datetopic" key={index}>{item}</p>
                        )}
                    </div>

                    {calendarObject.map((weeks, i) => (
                        <div className="weekSection" key={i}>

                            {weeks.map((day, j) => {
                                const isToday = day === toDay.getDate() && thisMonth === toDay.getMonth() && thisYear === toDay.getFullYear();

                                const mood = moodObj.find(m =>
                                    m.dateAt.getDate() === day &&
                                    m.dateAt.getMonth() === thisMonth &&
                                    m.dateAt.getFullYear() === thisYear
                                );

                                const moodClass = mood ? mood.class : '';
                                const textmood = mood ? mood.text : '';

                                return (
                                    <div className={`${day ? 'day' : 'notday'} ${isToday ? 'today' : ''} ${moodClass}`} key={j} title={textmood? textmood : 'ไม่มีบันทึก'}>
                                        <p>{day}</p>
                                    </div>
                                );
                            })}

                        </div>
                    ))}

                    <button className="historyStat" onClick={onChangePage}><p>สถิติ</p> <VscGraphLine style={{ color: 'var(--secondtext-color)', fontSize: '1rem', transition: 'color 0.7s ease-in-out' }} /></button>

                </div>

            </div>
        </>
    )
}