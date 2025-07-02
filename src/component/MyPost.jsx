import { useEffect, useState } from 'react';
import { getMypost } from "../api/Post";

import '../css/MyPost.css';
import CardPost from "./CardPost";

export default function MyPost({ ownerId }) {
    const [MypostObject, setMypostObject] = useState([]);

    //ดึงโพสของตัวเอง
    useEffect(() => {
        if (ownerId) {
            getMypost(ownerId).then(setMypostObject);
        }

    }, [ownerId]); // ทำงานเมื่อ ownerId มีการเปลี่ยนแปลง


    return (
        <>
            <div className="PostZone">
                <div className="postSection">
                    <div className="topicSection">
                        <p className="topic" data-aos="fade-right">
                            โพสต์ของฉัน
                        </p>
                    </div>

                    <div className="infoZone">
                        <div className="infoSection">
                            {
                                MypostObject.length > 0 && MypostObject.map((post, index) => (
                                    <CardPost key={post._id} postObj={post} />
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}