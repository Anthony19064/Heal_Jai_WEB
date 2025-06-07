import profile from '../assets/images/mockup.png';
import '../css/MyProfile.css';
import '../css/theme.css'

import MyPost from './MyPost.jsx';
import MyDiary from './MyDiary.jsx';
import MyTodo from './MyTodo.jsx';

import { useEffect, useState } from 'react';

import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LuNotebook } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";





export default function MyProfile(){

    // Check login
    const [userinfo, setUserinfo] = useState(null);
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    if (user) {
        setUserinfo(user);
    } else {
        console.log("User is not logged in");
    }
    }, []);

    //----------------------

    const ButtonDetail = [
        {
            icon: <FaRegUser size={40}/>,
            title: "โพสต์ของฉัน",
            tab: "MyPost"
        },
        {
            icon: <LuNotebook size={40}/>,
            title: "ไดอารี่ของฉัน",
            tab: "MyDiary"
        },
        {
            icon: <LuClipboardList size={40}/>,
            title: "สิ่งที่อยากทำ",
            tab: "MyTodo"
        }
    ]

    const [contentTab, setcontentTab] = useState("MyPost");
    return(
        <>
        <div className='ProfileZone'>
            <div className="profileInfoSection" data-aos="fade-up-right">
                <div className="profileInfo" >
                    <button className="editButton"><MdOutlineModeEdit size={30} color='white'/>แก้ไขโปรไฟล์</button>
                    <img src={userinfo?.photoURL ? userinfo.photoURL : profile} className="profileImg" />
                    <p className="profileUsername">{userinfo?.displayName ? userinfo.displayName : ""}</p>
                    <div className="buttonSection">
                        {
                            ButtonDetail.map((item) =>(
                                <div className='FeatureButton' role='button' key={item.title} onClick={() => setcontentTab(item.tab)}>
                                    {item.icon}
                                    <p className="title">
                                        {item.title}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {contentTab === "MyPost" && <MyPost ownerId={userinfo?.uid ? userinfo.uid : null}/>}
            {contentTab === "MyDiary" && <MyDiary ownerId={userinfo?.uid ? userinfo.uid : null}/>}
            {contentTab === "MyTodo" && <MyTodo ownerId={userinfo?.uid ? userinfo.uid : null}/>}
            
        </div>
        </>
    )
}