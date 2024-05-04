import { Link } from 'react-router-dom';

function Footer(){
    return(
        <footer>
            <div className="container">
                <p>Made With Love By Alaa Abdoh © 2024</p>
                <div className="social">
                    <Link to="tel:+972595508446">+972595508446</Link>
                    <Link to="mailto: alaajabdoh1701@gmail.com">Email</Link>
                    <Link to="https://www.facebook.com/abo.a.ez/">FaceBook</Link>
                    <Link to="https://www.instagram.com/alaa_abdoh_nablus/">Instagram</Link>
                    <Link to="https://github.com/alaa-abdoh">Github</Link>
                </div>
            </div>
        </footer>
    )
}
export default Footer;