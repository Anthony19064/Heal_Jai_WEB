//ดึงข้อมูลผู้ใช้จาก local หรือ session
export const getOwnerAccount = async () => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    return user
}

//ดึงข้อมูลผู้ใช้จาก DB
export const getAccount = async (postowner, setAccount) => {
    const res = await fetch('/api/getAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postowner }),
    });

    const data = await res.json();
    if (data) {
        setAccount(data);
    }
}