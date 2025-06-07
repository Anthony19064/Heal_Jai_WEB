import "../css/regis.css";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { regis } from "../api/regis";


export default function Regis() {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        });
    }, []);

    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');


    const SubmitRegis = async (e) => {
        e.preventDefault();
        const data = await regis(username, mail, password, confirmPassword);

        if (data.success) {
            toast.success(data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            toast.error(data.message);
        }
    };



    return (
        <>
            <div className="loginSection">

                <div className="regisForm" data-aos="flip-right">
                    <p className="titleForm">Welcome to HealJai</p>

                    <form onSubmit={SubmitRegis}>
                        <div className="inputSection">
                            <p className="titleInput">ชื่อผู้ใช้</p>
                            <input type="text" className="inputField" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <p className="titleInput">อีเมล</p>
                            <input type="email" className="inputField" value={mail} onChange={(e) => setMail(e.target.value)} />
                            <p className="titleInput">รหัสผ่าน</p>
                            <input type="password" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <p className="titleInput">ยืนยันรหัสผ่าน</p>
                            <input type="password" className="inputField" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />

                        </div>
                        <button className="submitButton" type="submit">ไปกันเลยยย</button>
                    </form>
                </div>
            </div>
        </>
    )
}