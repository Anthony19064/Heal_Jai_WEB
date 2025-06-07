import '../css/Footer.css'

export default function Footer(){
    const currentYear = new Date().getFullYear();
    return(
        <>
            <footer>
                <p>© {currentYear} Copyright : Healjai Mini</p>
            </footer>
        </>
    )
}