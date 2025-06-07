import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.js';


export const maliLogin = async (mail, password, remember) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
        const account = data.user
        const storage = remember ? localStorage : sessionStorage;

        storage.setItem('user', JSON.stringify({
            displayName: account.username,
            email: account.mail,
            uid: account.id,
            photoURL: account.photoURL
        }));
        return account
    } else {
        throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }

}

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

        const res = await fetch('/api/googleAuth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayName, email, uid, photoURL }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            const account = data.user;
            localStorage.setItem('user', JSON.stringify({
                displayName: account.username,
                email: account.mail,
                uid: account.id,
                photoURL: account.photoURL
            }));
        }

    } catch (error) {
        console.error("❌ Google Login Error:", error);
    }
};
