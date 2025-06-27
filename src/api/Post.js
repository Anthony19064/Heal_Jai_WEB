import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js';

const API = import.meta.env.VITE_API_URL;

//---------------------------------------------------------------
//ตัวอย่างเรียก API จาก Link ที่ Deploy แล้ว
// const API = import.meta.env.VITE_API_URL;

// export const getAllPost = async (setpostObject) => {
//     try {
//         const res = await fetch(`${API}/api/getAllpost`);
//         const data = await res.json();
//         if (data) {
//             setpostObject(data) ;
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//---------------------------------------------------------------

//ดึงโพสของตัวเอง
export const getMypost = async (ownerId) => {
    try {
        const res = await fetch(`${API}/api/getMypost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerId }), //ส่งไอดีตัวเอง
        });

        const data = await res.json();
        if (data && data.success) {
            return data.data;
        }
    } catch (error) {
        console.log(error)
    }
}

//ดึงโพสทั้งหมด
export const getAllPost = async (page, limit) => {
    try {
        const skip = page * limit;
        const res = await fetch(`${API}/api/getAllpost?skip=${skip}&limit=${limit}`);
        const data = await res.json();
        if (data && data.success) {
            return data.data
        }
    } catch (error) {
        console.log(error)
    }
}

//ดึงจำนวนคนที่กดถูกใจ
export const getCountLike = async (postID, setCountLike) => {
    const res = await fetch(`${API}/api/countLike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await res.json();
    if (data && data.success) {
        setCountLike(data.data);
    }
}

export const addLike = async (postID, userID) => {
    const res = await fetch(`${API}/api/addLike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID, userID }),
    })

    const data = await res.json();
    if (data && data.success) {
        return data
    }
}

export const getLike = async (postID, userID) => {
    const res = await fetch(`${API}/api/getLike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID, userID }),
    })

    const data = await res.json();
    return data.success
}


//ดึงจำนวนคนที่คอมเมนต์
export const getCountComment = async (postID, setCountComment) => {
    const res = await fetch(`${API}/api/countComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await res.json();
    if (data && data.success) {
        setCountComment(data.data);
    }
}



//ดึงข้อมูลคอมเมนต์
export const getComment = async (postID, setcommenObj) => {
    const resComment = await fetch(`${API}/api/getComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await resComment.json();
    if (data && data.success) {
        const commentObj = data.data
        // Promise.all รันพร้อมกัน
        const commentWithAccount = await Promise.all(
            commentObj.map(async (item) => {
                const res = await fetch(`${API}/api/getAccount`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postowner: item.ownerComment }),
                });
                const account = await res.json();
                const data = account.data;
                return {
                    ...item,
                    username: data.username,
                    photo: data.photoURL
                };
            })
        );
        setcommenObj(commentWithAccount);
    }
}

//เพิ่มคอมเมนต์
export const addComment = async (postID, userId, commentInfo) => {
    const res = await fetch(`${API}/api/addComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID, userId, commentInfo }),
    })

    const data = await res.json();
    if (data && data.success) {
        return data
    }
}

//เพิ่มโพส
export const addPost = async (ownerId, infoPost, imgUrl) => {
    const res = await fetch(`${API}/api/addPost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, infoPost, imgUrl })
    })

    const data = await res.json();
    if (data && data.success) {
        return data
    }
}

export const uploadImage = async (file, folder) => {
    try {
        const timestamp = Date.now();
        const storageRef = ref(storage, `${folder}/${timestamp}_${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}