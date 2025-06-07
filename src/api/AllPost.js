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

