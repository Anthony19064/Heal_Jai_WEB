import '../css/Navbar.css'
import '../css/theme.css'
import { CiHeart } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { useRole } from './ChatUser';
export default function NavChat() {
    const { setRole } = useRole();

    return (
        <>
            <div className='NavZone'>
                <nav className="navbar" data-aos="fade-down">
                    <ul>
                        <p className="logo logoChat" >HealJai<CiHeart className='iconHeart' size={50} /></p>
                    </ul>
                    <ul className='rightSection'>
                        <button className='endChat' onClick={() => setRole('')}> จบการสนทนา <IoMdExit size={23} color='#FFFFFF' className='exitIcon'/></button>
                    </ul>

                </nav>
            </div>
        </>
    )
}

