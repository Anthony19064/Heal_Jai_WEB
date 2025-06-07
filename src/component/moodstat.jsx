import Lottie from "lottie-react";
import stress from '../assets/icons/Animation - 1747638906142.json'
import sad from '../assets/icons/Animation - 1747638873056.json'
import happy from '../assets/icons/Animation - 1747639008997.json'
import normal from '../assets/icons/Animation - 1747638950145.json'
import angry from '../assets/icons/Animation - 1747638918123.json'
import { TbCalendarMonth } from "react-icons/tb";
import { useEffect, useState, useMemo } from "react";
import { getLatestMood, getDayStack } from "../api/moodStat";

export default function MoodStat({ onChangePage, userId, refreshState }) {
    const [latestMood, setLatestMood] = useState(null);
    const [dayStack, setDayStack] = useState(null);
    useEffect(() => {
        if (userId) {
            getLatestMood(userId, setLatestMood);
            getDayStack(userId, setDayStack)
        }
    }, [userId, refreshState]);

    const moodObj = {
        'angry': { icon: angry, text: "โกธร" },
        'happy': { icon: happy, text: "มีความสุข" },
        'normal': { icon: normal, text: "เฉยๆ" },
        'sad': { icon: sad, text: "เศร้า" },
        'stress': { icon: stress, text: "เครียด" }
    }

    const myMood = useMemo(() => {
        if (!latestMood) return null;
        return moodObj[latestMood.value];
    }, [latestMood]);


    return (
        <>
            <div className="infoRight" data-aos='fade-left' data-aos-duration="1000">
                <div className="innerInfo">
                    <p className="statMood">สถิติบันทึกอารมณ์</p>
                    <div className="showStat">
                        <div className="statLeft">
                            <p className="statLeftTitle">วันต่อเนื่อง</p>
                            <p className="statLeftDay">{dayStack ? dayStack : ''}</p>
                            <p className="statLeftText">ทำต่อไปนะ สู้คั้บ !!</p>
                        </div>
                        <div className="statRight">
                            <p className="statRightTitle">อารมณ์เมื่อวาน</p>
                            <Lottie animationData={myMood ? myMood.icon : null} loop={true} autoplay={true} className="moodIcon" />
                            <p className="statRightText">{myMood ? myMood.text : ''}</p>
                        </div>
                    </div>
                    <button className="historyStat" onClick={onChangePage}><p>ประวัติ</p> <TbCalendarMonth style={{ color: 'var(--secondtext-color)', fontSize: '2rem', transition: 'color 1s ease-in-out' }} /></button>

                </div>
            </div>
        </>
    )
}