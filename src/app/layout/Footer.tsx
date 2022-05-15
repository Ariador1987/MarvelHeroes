import { useState } from "react";
import logo from "../assets/LogoBojaRaster-sRGB.png";

const Footer = () => {
    const [date, setDate] = useState(new Date().getUTCFullYear());

    // tried to put my svg logo here but it took my soul
    // and since its more or less irrelevant did this quick and dirty
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
