const API = import.meta.env.VITE_API_URL;

//ดึงข้อมูลผู้ใช้จาก local หรือ session
export const getInfoAccount = async () => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    if(user){
        return user
    }
}

//ดึง ID ผู้ใช้จาก local หรือ session
export const getIdAccount = async () => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    if(user){
        return user.id
    }
}

//ดึงข้อมูลผู้ใช้จาก DB
export const getAccount = async (postowner, setAccount) => {
    const res = await fetch(`${API}/api/getAccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postowner }),
    });

    const data = await res.json();
    if (data && data.success) {
        setAccount(data.data);
        return;
    }
}