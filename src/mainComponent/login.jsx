import "../css/login.css";
import google from "../assets/icons/google.svg";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { maliLogin } from "../api/Auth.js";
import { GoogleLogin } from "../api/Auth.js";


export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        });
    }, []);

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const SubmitLogin = async (e) => {
        e.preventDefault();

        try {
            await maliLogin(mail, password, remember);
            navigate(`/`);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleGoogle = async () => {
        try {
            await GoogleLogin();
            navigate(`/`);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="loginSection">

                <div className="loginForm" data-aos="flip-left">
                    <p className="titleForm">Welcome to HealJai</p>

                    <form onSubmit={SubmitLogin}>
                        <div className="inputSection">
                            <p className="titleInput">อีเมล</p>
                            <input type="email" className="inputField" value={mail} onChange={(e) => setMail(e.target.value)} />
                            <p className="titleInput">รหัสผ่าน</p>
                            <input type="password" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="inputOption">
                                <div className="leftOption">
                                    <input type="checkbox" className="rememberCheck" id="rememberCheck" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                                    <p className="remember">จดจำฉันไว้</p>
                                </div>
                                <a href="" className="forgot">ลืมรหัสผ่าน ?</a>
                            </div>
                        </div>
                        <button className="submitLoginButton" type="submit">ไปกันเลยยย</button>
                    </form>

                    <div className="lineSection">
                        <div className="line"></div>
                        <div className="Ortitle">
                            <p>หรือ</p>
                        </div>

                    </div>

                    <button className="googleLogin" onClick={handleGoogle}>
                        <img src={google} className="googleIcon" />
                        <p>เข้าสู่ระบบด้วย Google</p>
                    </button>

                    <p className="regisTitle">ยังไม่มีบัญชีหรอ?  <Link to={"/regis"} >งั้นไปสมัครกันเลยย</Link></p>
                </div>
            </div>
        </>
    )
}