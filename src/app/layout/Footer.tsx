import { useState } from "react";
import logo from "../assets/LogoBojaRaster-sRGB.png";

const Footer = () => {
    //eslint-disable-next-line
    const [date, setDate] = useState(new Date().getUTCFullYear());

    return (
        <footer className="footer">
            <div className="footer__info">
                <p className="footer__info--para">
                    Made by &copy;2B&nbsp;{date}&nbsp; for blank competency test
                </p>
                <img className="footer__info--img" src={logo} alt="" />
            </div>
        </footer>
    );
};

export default Footer;
