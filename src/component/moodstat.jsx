import Lottie from "lottie-react";
import funny from '../assets/icons/Animation-funnyMood.json'
import sad from '../assets/icons/Animation-sadMood.json'
import happy from '../assets/icons/Animation-happyMood.json'
import normal from '../assets/icons/Animation-normalMood.json'
import angry from '../assets/icons/Animation-angryMood.json'
import emty from '../assets/icons/Animation-emtyMood.json'

import { TbCalendarMonth } from "react-icons/tb";
import { useEffect, useState, useMemo } from "react";
import { getLatestMood, getDayStack } from "../api/mood";

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
        'funny': { icon: funny, text: "สนุก" }
    }

    const myMood = useMemo(() => {
        if (!latestMood) return null;
        return moodObj[latestMood.value];
    }, [latestMood]);


    return (
        <>
            <div className="innerInfo">
                <p className="statMood">สถิติบันทึกอารมณ์</p>
                <div className="showStat">
                    <div className="statLeft">
                        <p className="statLeftTitle">วันต่อเนื่อง</p>
                        <p className="statLeftDay">{dayStack ? dayStack : '0'}</p>
                        <p className="statLeftText">{dayStack > 0 ? 'ทำต่อไปนะ สู้ๆคั้บ !!' : 'มาเริ่มไปด้วยกันนะ'}</p>
                    </div>
                    <div className="statRight">
                        <p className="statRightTitle">อารมณ์เมื่อวาน</p>
                        <Lottie animationData={myMood ? myMood.icon : emty} loop={true} autoplay={true} className="moodIcon" />
                        <p className="statRightText">{myMood ? myMood.text : 'มาเริ่มบันทึกกันเถอะ'}</p>
                    </div>
                </div>
                <button className="historyStat" onClick={onChangePage}><p>ประวัติ</p> <TbCalendarMonth style={{ color: 'var(--secondtext-color)', fontSize: '2rem', transition: 'color 1s ease-in-out' }} /></button>
            </div>

        </>
    )
}