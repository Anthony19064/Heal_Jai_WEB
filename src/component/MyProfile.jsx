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

import { getInfoAccount } from '../api/Account.js';




export default function MyProfile(){

    // Check login
    const [userinfo, setUserinfo] = useState(null);
    useEffect(() => {
        getInfoAccount().then(setUserinfo)
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
                    <img src={userinfo? userinfo.img : profile} className="profileImg" />
                    <p className="profileUsername">{userinfo? userinfo.username : "" }</p>
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
            {contentTab === "MyPost" && <MyPost ownerId={userinfo? userinfo.id : null}/>}
            {contentTab === "MyDiary" && <MyDiary ownerId={userinfo? userinfo.id : null}/>}
            {contentTab === "MyTodo" && <MyTodo ownerId={userinfo? userinfo.id : null}/>}
            
        </div>
        </>
    )
}