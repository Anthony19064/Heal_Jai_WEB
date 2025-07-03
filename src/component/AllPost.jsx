import { useEffect, useState } from 'react';
import { getAllPost, addPost, uploadImage } from "../api/Post";
import { getInfoAccount } from '../api/Account';


import loadingAnimation from '../assets/icons/Animation - 1749605201280.json';
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdImage } from "react-icons/io";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

import '../css/AllPost.css';
import CardPost from "./CardPost";

//Libary
import Lottie from "lottie-react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

export default function AllPost() {
    const [postObject, setpostObject] = useState([]);
    const [userinfo, setUserinfo] = useState(null);
    const [infoPost, setinfoPost] = useState('');
    const [imgPost, setImgPost] = useState(null)
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 5;
    const owenrId = userinfo ? userinfo.id : '';
    const [loading, setLoading] = useState(false);
    const { ref, inView } = useInView();
    const [emojiState, setEmojiState] = useState(false);
    const [createLoading, setCreateLoading] = useState(false)


    //ดึงโพสทั้งหมด
    useEffect(() => {
        window.scrollTo(0, 0);
        getInfoAccount().then(setUserinfo);
    }, []);

    //OwnerPostId, infoPost
    const CreatePost = async () => {
        if(!owenrId){
            toast.error('ต้องเข้าสู่ระบบก่อนนะครับ :)');
            setinfoPost('');
            setImgPost(null);
            return;
        }
        if (!infoPost || !infoPost.trim()) return toast.error('ใส่ข้อความที่ต้องการด้วยค้าบ');
        if (imgPost) {
            setCreateLoading(true);
            const imgUrl = await uploadImage(imgPost, 'Post');
            const data = await addPost(owenrId, infoPost, imgUrl);
            setinfoPost('');
            setImgPost(null);
            setEmojiState(false);
            setpostObject(prev => [data.data, ...prev]);
            setCreateLoading(false);
        }
        else {
            setCreateLoading(true);
            const data = await addPost(owenrId, infoPost, null);
            setinfoPost('');
            setEmojiState(false);
            setImgPost(null);
            setpostObject(prev => [data.data, ...prev]);
            setCreateLoading(false);
        }
    }

    const loadMorePost = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const newPost = await getAllPost(page, limit);
        if (newPost.length < limit) {
            setHasMore(prev => !prev)
        }
        setpostObject(prev => [...prev, ...newPost]);
        setPage(prev => prev + 1);
        setLoading(false);
    }

    useEffect(() => {
        if (inView) {
            loadMorePost();
        }
    }, [inView]);


    const emojis = [
        "😄",
        "😁",
        "😆",
        "😊",
        "😂",
        "🤣",
        "😚",
        "😍",
        "🥳",
        "🤨",
        "🩷",
        "💕",
        "😞",
        "🙁",
        "😢",
        "😫",
        "🥺",
        "😪",
        "🫰",
        "✌",
        "🫶",
        "😑",
        "😤",
        "😡",]

    const groupedText = [
        "พื้น", "ที่", "ส่ง", "ต่อ", "ความ", "รู้", "สึก", "ดีๆ"
    ];

    return (
        <>
            <div className="allpostZone">
                <p className="allpostTitle" data-aos='fade-up'>
                    {groupedText.map((word, index) => (
                        <motion.span
                            key={index}
                            style={{ display: "inline-block" }}
                            animate={{
                                y: [0, -10, 0],           // เด้งขึ้นลง 
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                                delay: index * 0.1,     // เว้นจังหวะให้เด้งเรียงกัน
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </p>
                <div className="createPostSection">
                    <div className="creatPost" data-aos='fade-up' data-aos-delay={200}>
                        <div className="ownerAccount">
                            <img src={userinfo ? userinfo.img : null} alt="" />
                            <p>{userinfo ? userinfo.username : ""}</p>
                        </div>
                        <textarea placeholder='ส่งต่อความรู้สึกดีๆกันเถอะ . . . .' value={infoPost} onChange={(e) => setinfoPost(e.target.value)}
                            onKeyDown={async (e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    CreatePost();
                                }
                            }}></textarea>
                        <AnimatePresence>
                            {imgPost && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div className='previewZone' data-aos='fade-up'>
                                        <img src={URL.createObjectURL(imgPost)} className='previewImg'></img>
                                        <IoCloseCircleOutline size={30} color='#464646' className='closeIcon' onClick={() => setImgPost(null)} />
                                    </div>
                                </motion.div>

                            )}
                        </AnimatePresence>


                        <div className="buttonCreatZone">
                            <div className="buttonLeft">
                                <BsEmojiSmile size={35} color='var(--main-color)' onClick={() => { setEmojiState(prev => !prev) }} />
                                <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                                    <IoMdImage size={40} color='var(--main-color)' />
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => setImgPost(e.target.files[0])}
                                />
                            </div>
                            <button onClick={CreatePost}>{createLoading ? <Lottie animationData={loadingAnimation} loop={true} autoplay={true} className='createLoad' /> : 'สร้างโพส'}</button>

                        </div>
                        <AnimatePresence>
                            {emojiState && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div className="emojiSection" data-aos='fade-up'>
                                        {emojis.map((emoji) => (
                                            <span key={emoji} onClick={() => setinfoPost(prev => prev + emoji)}>{emoji}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>


                    </div>
                </div>
                <div className="allPostZone">
                    <div className="allpostSection">
                        {
                            postObject.length > 0 && postObject.map((post) => (
                                <CardPost key={post._id} postObj={post} />
                            ))
                        }

                    </div>
                </div>
                {/* ไว้โหลดโพสเพิ่มเมื่อเลื่อนมาถึง */}
                <div ref={ref} style={{ height: 1, background: "transparent" }}></div>
                {loading && <p>กำลังโหลด . . . .</p>}
                {!hasMore && <p>โพสหมดแล้วค้าบบ</p>}
            </div>


        </>
    )
}