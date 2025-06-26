import { signOut, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.js';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_URL;

//ลงทะเบียนสมัครสมาชิก
export const regis = async (username, mail, password, confirmPassword) => {
    try {
        const res = await fetch(`${API}/api/regis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, mail, password, confirmPassword }),
        });

        const data = await res.json();
        if (data) {
            return data
        }
        else {
            throw new Error(data.message)
        }

    } catch (error) {
        console.log(error)
    }
}

//ล็อคอินด้วย mail
export const maliLogin = async (mail, password, remember) => {
    const res = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
        const account = data.user
        const storage = remember ? localStorage : sessionStorage;

        storage.setItem('user', JSON.stringify({
            username: account.username,
            email: account.mail,
            id: account.id,
            img: account.photoURL
        }));
        return account
    } else {
        throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }

}

//ล็อคอินด้วย Google
export const GoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        let displayName = null;
        let email = null;
        let uid = null;
        let photoURL = null;

        if (user) {
            displayName = user.displayName;
            email = user.email;
            uid = user.uid;
            photoURL = user.photoURL;
        }

        const res = await fetch(`${API}/api/googleAuth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayName, email, uid, photoURL }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            const account = data.user;
            localStorage.setItem('user', JSON.stringify({
                username: account.username,
                email: account.mail,
                id: account.id,
                img: account.photoURL
            }));
        }

    } catch (error) {
        console.error("❌ Google Login Error:", error);
    }
};


//ออกจากระบบ
export const handleLogout = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        toast.success('ออกจากระบบเรียบร้อยครับ :)');
        window.location.href = '/';
    } catch (error) {
        console.error("❌ Logout failed:", error);
    }
};