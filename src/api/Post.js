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
        const res = await fetch('/api/getMypost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerId }), //ส่งไอดีตัวเอง
        });

        const data = await res.json();
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

//ดึงโพสทั้งหมด
export const getAllPost = async (setpostObject) => {
    try {
        const res = await fetch('/api/getAllpost');
        const data = await res.json();
        if (data) {
            setpostObject(data) ;
        }
    } catch (error) {
        console.log(error)
    }
}

//ดึงจำนวนคนที่คอมเมนต์
export const getCountComment = async (postID, setCountComment) => {
    const res = await fetch('/api/countComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await res.json();
    if (data) {
        setCountComment(data);
    }
}

//ดึงข้อมูลคอมเมนต์
export const getComment = async (postID, setcommenObj) => {
    const resComment = await fetch('/api/getComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID }),
    });

    const data = await resComment.json();
    if (data) {
        // Promise.all รันพร้อมกัน
        const commentWithAccount = await Promise.all(
            data.map(async (item) => {
                const res = await fetch('/api/getAccount', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ postowner: item.ownerComment }),
                });
                const account = await res.json();
                return {
                    ...item,
                    username: account.username,
                    photo: account.photoURL
                };
            })
        );
        setcommenObj(commentWithAccount);
    }
}

//เพิ่มคอมเมนต์
export const addComment = async (postID, userId, commentInfo) => {
    const res = await fetch('/api/addComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postID, userId, commentInfo }),
    })

    const data = await res.json();
    if (data) {
        return data
    }
}