import '../css/FeatureSection.css';
import commuImage from '../assets/images/commuImage.svg';
import chatImage from '../assets/images/chatImage.svg';
import dairyImage from '../assets/images/dairyImage.svg'
import { Carousel } from 'primereact/carousel';
import { Link } from 'react-router-dom';

export default function FeatureSection() {

    const features = [
        { image: commuImage, title: "คอมมูนิตี้", info: "แบ่งปันกำลังใจ และพูดคุยกับผู้ใช้อื่น", button: "เข้าสู่ชุมชน", text: "มารับกำลังใจจากคนอื่น<br/>หรือ<br/>ให้กำลังใจคนอื่นกันเถอะ :)", class: 'commu', link: "/commu" },
        { image: chatImage, title: "ระบายใจ", info: "แชทแบบไม่ระบุตัวตนกับผู้ใช้อื่น<br/>หรือ Ai ประจำเว็บไซต์", button: "เริ่มแชท", text: "พูดสิ่งที่อยู่ในใจ<br/>หรือ<br/>รับฟังความในใจของคนอื่นดูไหม ?", class: 'chat', link: "/chat" },
        { image: dairyImage, title: "ไดอารี่", info: "บันทึกเรื่องราวดีๆในชีวิตประจำวัน", button: "เขียนไดอารี่", text: "มาหาความสุขเล็กๆน้อยๆ<br/>รอบตัวกันเถอะ ❤️", class: 'dairy', link: "/dairy" }
    ];

    const featuresTemplate = (features) => {
        return (
            <div className="commuSection">
                <div className="wrapCommuCard">
                    <div className={`featureSliderCard ${features.class}`} >
                        <div className="imageCircle">
                            <img src={features.image} className="commuImage" alt="community" />
                        </div>
                        <p className={`featureSliderTitle ${features.class}Title`}>{features.title}</p>
                        <p className="commuInfo" dangerouslySetInnerHTML={{ __html: features.info }}></p>
                        <Link to={features.link} style={{ textDecoration: 'none' }}>
                            <button className={`featureSliderButton ${features.class}Button`}>{features.button}</button>
                        </Link>

                    </div>
                </div>

                <div className={`commuText`}>
                    <p dangerouslySetInnerHTML={{ __html: features.text }}></p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='FeatureZone'>
                <div data-aos="fade-up">
                    <p className="headerFeature" >{`พื้นที่พักหัวใจสำหรับทุกคน :)`}</p>
                </div>
                <Carousel
                    value={features}
                    itemTemplate={featuresTemplate}
                    numVisible={1}
                    numScroll={1}
                    circular
                    className="carouselSection"
                    data-aos='fade-up'
                    data-aos-delay={400}
                />
            </div>
        </>
    );
}
