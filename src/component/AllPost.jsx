import { useEffect, useState } from 'react';
import { getAllPost } from "../api/Post";
import { getInfoAccount } from '../api/Account';

import { BsEmojiSmile } from "react-icons/bs";
import { IoMdImage } from "react-icons/io";
import { IoColorPaletteOutline } from "react-icons/io5";

import '../css/AllPost.css';
import CardPost from "./CardPost";

export default function AllPost() {
    const [ postObject, setpostObject ] = useState([]);
    const [ userinfo, setUserinfo ] = useState(null)

    //ดึงโพสทั้งหมด
    useEffect(() => {
        getAllPost(setpostObject);
        getInfoAccount().then(setUserinfo);
    }, []);


    return (
        <>
            <div className="allpostZone">
                <div className="creatPostSection" data-aos='fade-left'>
                    <div className="ownerAccount">
                        <img src={userinfo? userinfo.img : null} alt="" />
                        <p>{userinfo? userinfo.username : ""}</p>
                    </div>
                    <textarea placeholder='ส่งต่อความรู้สึกดีๆกันเถอะ . . . .'></textarea>
                    <div className="buttonCreatZone">
                        <div className="buttonLeft">
                            <BsEmojiSmile size={35} color='var(--main-color)'/>
                            <IoMdImage size={40} color='var(--main-color)'/>
                            <IoColorPaletteOutline size={40} color='var(--main-color)'/>
                        </div>
                        <button>สร้างโพส</button>
                    </div>
                </div>
                <div className="allpostSection">
                    {
                        postObject.length > 0 && postObject.map((post) => (
                            <CardPost key={post._id} postObj={post} />
                        ))
                    }

                </div>
            </div>


        </>
    )
}