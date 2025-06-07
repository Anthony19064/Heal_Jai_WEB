import { useEffect, useState } from 'react';

import { TfiMore } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";

import { Link } from 'react-router-dom';
import { getAccount, getCountComment, getComment, addComment } from '../api/cardPost';
import '../css/CardPost.css';

export default function CardPost({ postObj }) {
    const [commentState, setCommentState] = useState(false);
    const [commenObj, setcommenObj] = useState([]);
    const [commentInfo, setcommentInfo] = useState('');

    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
        if (user) {
            setUserId(user.uid);
        } else {
            console.log("User is not logged in");
        }
    });


    //ดึงข้อมูล Account ของเจ้าของโพส
    const [Account, setAccount] = useState(null);
    useEffect(() => {
        if (postObj.ownerPost) {
            getAccount(postObj.ownerPost, setAccount);
        }
    }, [postObj.ownerPost]);

    //ดึงจำนวนคอมเม้น
    const [countComment, setCountComment] = useState(0);
    useEffect(() => {
        if (postObj._id) {
            getCountComment(postObj._id, setCountComment);
        }
    },[postObj._id])

    //ดึงคอมเม้นมาแสดง
    useEffect(() => {
        if (commentState === true) {
            if (postObj._id) {
                getComment(postObj._id, setcommenObj);
            }
        }
    }, [commentState])


    const ButtonPost = [
        {
            icon: <FaHeart size={30} color="#FD7D7E" />,
            text: '15',
            color: 'likebutton',
        },
        {
            icon: <FaRegCommentDots size={30} color="#FFAC59" />,
            text: countComment,
            color: 'commentbutton',
            functionButton: () => setCommentState(prev => !prev),
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
                            <p className="OwnerName">{Account?.username ? Account.username : ''}</p>
                        </div>
                    </Link>
                    <div className="moreIcon">
                        <TfiMore size={55} color="var(--main-color)" />
                    </div>
                </div>

                <div className="contentCard">
                    <p className="ownerContent"> {postObj.infoPost} </p>
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
                {commentState === true &&
                    <div className="commentPost" data-aos='fade-up'>
                        <div className="inputComment">
                            <input type="text" placeholder='เขียนความคิดเห็น. . . .' value={commentInfo} onChange={(e) => setcommentInfo(e.target.value)} />
                            <button onClick={async () => {
                                await addComment(postObj._id, userId, commentInfo); //เพิ่มคอมเม้น
                                setcommentInfo(''); // reset input
                                getComment(postObj._id, setcommenObj); //ดึงข้อมูลคอมเม้น
                                getCountComment(postObj._id, setCountComment); //ดึงจำนวนคอมเม้น
                            }}>
                                ส่ง</button>
                        </div>

                        {commenObj.map((comment) => (
                            <div className="commentCard" key={comment._id} data-aos='fade-up'>
                                <Link to={`/profile/${comment ? comment.username : ''}`} style={{ textDecoration: 'none', width: 'fit-content', display: 'inline-block' }}>
                                    <div className="ownerCommentSection">
                                        <img src={comment.photo} alt="" />
                                        <p>{comment.username}</p>
                                    </div>
                                </Link>
                                <p className="commentinfo">{comment.infoComment}</p>
                            </div>
                        ))}



                    </div>}
            </div>
        </>
    )
}
