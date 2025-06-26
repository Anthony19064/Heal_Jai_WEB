import 'aos/dist/aos.css';
import cardimg from '../assets/images/cardimg.png';
import '../css/WelcomeSection.css';
import '../css/theme.css';

export default function WelcomeSection (){

    return (
        <>
            <div className='WelcomeZone'>
                <div className='section'>
                    <div className="content"> 
                        <div className="leftcontent" data-aos="fade-right">
                            <p className="textcontent">&nbsp;&nbsp;&nbsp;มาสร้างความรู้สึก <span className="healjai">ฮีลใจ</span> ให้ตัวเอง<br /> และ <span className="healjai">ฮีลใจ</span> ให้คนอื่นกันเถอะ !!</p>
                            <p className="textcontent">&nbsp;&nbsp;&nbsp;วันนี้อาจจะไม่ดีเท่าไหร่ แต่พรุ่งนี้<br /> มันจะต้องดีขึ้นแน่นอน</p>
                            <span className="circleRight"/>
                            <span className="circleLeft" />
                        </div>
                        <div className='rightcontent' data-aos="fade-left">
                            <div className="card">
                                <img className='cardimg' src={cardimg}/>
                                <p className='cardtext'> สวัสดีครับวันนี้เหนื่อยไหม ?<br />ถ้าเหนื่อยก็มานั่งพักที่นี่ก่อนได้นะ<br />ผมตั้งใจสร้างที่นี่ไว้ให้ทุกคนเลยนะ :)</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}