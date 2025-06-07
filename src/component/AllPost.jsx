import { useEffect, useState } from 'react';
import { getAllPost } from "../api/AllPost";

import '../css/AllPost.css';
import CardPost from "./CardPost";

export default function AllPost() {
    const [postObject, setpostObject] = useState([]);

    //ดึงโพสทั้งหมด
    useEffect(() => {
        getAllPost(setpostObject);
    }, []);


    return (
        <>
            <div className="allpostZone">
                <div className="creatPostSection"></div>
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