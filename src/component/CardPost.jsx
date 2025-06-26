import { useEffect, useState } from 'react';

import { TfiMore } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";

import { Link } from 'react-router-dom';
import { getCountComment, getComment, addComment, getCountLike, addLike, getLike } from '../api/Post';
import { getAccount, getIdAccount } from '../api/Account';
import '../css/CardPost.css';
import { toast } from 'react-toastify';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { motion, AnimatePresence } from 'framer-motion';

dayjs.extend(relativeTime);

export default function CardPost({ postObj }) {
    const [imgLoaded, setImgLoaded] = useState(false);

    const [commentState, setCommentState] = useState(false);
    const [commenObj, setcommenObj] = useState([]);
    const [commentInfo, setcommentInfo] = useState('');

    const [stateLike, setStateLike] = useState(false);

    const [userId, setUserId] = useState(null);
    useEffect(() => {
        getIdAccount().then(setUserId);
        if (userId) {
            getLike(postObj._id, userId).then(data => setStateLike(data));
        }

    });


    //ดึงข้อมูล Account ของเจ้าของโพส
    const [Account, setAccount] = useState(null);
    useEffect(() => {
        if (postObj.ownerPost) {
            getAccount(postObj.ownerPost, setAccount);
        }
    }, [postObj.ownerPost]);

    //ดึงจำนวนคอมเม้น ถูกใจ
    const [countComment, setCountComment] = useState(0);
    const [countLike, setCountLike] = useState(0);
    useEffect(() => {
        if (postObj._id) {
            getCountComment(postObj._id, setCountComment);
            getCountLike(postObj._id, setCountLike);
        }
    }, [postObj._id])

    //ดึงคอมเม้นมาแสดง
    const OpenComment = async () => {
        await getComment(postObj._id, setcommenObj);
        setCommentState(prev => !prev)
    }

    const SubmitComment = async () => {
        const trimmed = commentInfo.trim();
        if (!trimmed) {
            toast.error('กรุณาระบุข้อความที่ต้องการคอมเมนต์');
            return;
        }

        await addComment(postObj._id, userId, commentInfo); //เพิ่มคอมเม้น
        setcommentInfo(''); // reset input
        getComment(postObj._id, setcommenObj); //ดึงข้อมูลคอมเม้น
        getCountComment(postObj._id, setCountComment); //ดึงจำนวนคอมเม้น
    }

    const Likebutton = async () => {
        await addLike(postObj._id, userId);
        getCountLike(postObj._id, setCountLike);
        getLike(postObj._id, userId).then(data => setStateLike(data));
    }


    const ButtonPost = [
        {
            icon: stateLike ? <FaHeart size={30} color="#FD7D7E" data-aos='zoom-out' data-aos-duration="500" /> : <FaRegHeart size={30} color="#FD7D7E" data-aos='zoom-in' data-aos-duration="500" />,
            text: countLike,
            color: 'likebutton',
            functionButton: () => Likebutton()
        },
        {
            icon: <FaRegCommentDots size={30} color="#FFAC59" />,
            text: countComment,
            color: 'commentbutton',
            functionButton: async () => OpenComment(),
        },
        {
            icon: <BsArrowRepeat size={30} color="#7F71FF" />,
            text: '5',
            color: 'repostbutton'
        },
    ]

    return (
        <>
            <div className="cardMypost" data-aos="fade-up">
                <div className="headCard">
                    <Link to={`/profile/${Account?.username ? Account.username : ''}`} style={{ textDecoration: 'none' }}>
                        <div className="OwnerPost">
                            <img className="OwnerImg" src={Account?.photoURL ? Account.photoURL : null} />
                            <div>
                                <p className="OwnerName">{Account?.username ? Account.username : ''}</p>
                                <p className='timePost'>{dayjs(postObj.createdAt).fromNow()}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="moreIcon">
                        <TfiMore size={55} color="var(--main-color)" />
                    </div>
                </div>

                <div className="contentCard">
                    <p className="ownerContent"> {postObj.infoPost} </p>

                    {postObj.img && (
                        <>
                            {!imgLoaded && (
                                <Skeleton  className='postImgSkeleton' />
                            )}
                            <img src={postObj.img} onLoad={() => setImgLoaded(true)} onError={() => setImgLoaded(true)} style={{
                                opacity: imgLoaded ? 1 : 0,
                                transition: 'opacity 0.5s ease',
                            }}></img>
                        </>
                    )}
                </div>

                <div className="bottomCard">
                    {ButtonPost.map((item, index) => (
                        <button className={`ButtonPost ${item.color}`} key={index} onClick={item.functionButton}>
                            {item.icon}
                            <p> {item.text}</p>
                        </button>
                    ))
                    }
                </div>
                <div className="bottomLine"></div>
                <AnimatePresence>
                    {commentState && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="commentPost" data-aos='fade-up'>
                                <div className="inputComment">
                                    <input type="text" placeholder='เขียนความคิดเห็น. . . .' value={commentInfo} onChange={(e) => setcommentInfo(e.target.value)}
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                await SubmitComment();
                                            }
                                        }} />
                                    <button onClick={() => SubmitComment()}>ส่ง</button>
                                </div>

                                {commenObj.map((comment) => (
                                    <div className="commentCard" key={comment._id} data-aos='fade-up'>
                                        <Link to={`/profile/${comment ? comment.username : ''}`} style={{ textDecoration: 'none', width: 'fit-content', display: 'inline-block' }}>
                                            <div className="ownerCommentSection">
                                                <img src={comment.photo} alt="" />
                                                <div className="groupright">
                                                    <p className='username'>{comment.username}</p>
                                                    <p className='timeComment'>{dayjs(comment.createdAt).fromNow()}</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <p className="commentinfo">{comment.infoComment}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
