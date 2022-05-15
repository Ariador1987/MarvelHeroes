import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import SearchForm from "../../features/shared/SearchForm";
import { useAppContext } from "../context/AppContext";

const navLinks = [
    { title: "home", path: "/" },
    { title: "bookmarks", path: "/bookmarks" },
];

const Navbar = () => {
    const { navbarRef } = useAppContext();
    const [showLinks, setShowLinks] = useState<boolean>(false);
    const linksContainerRef = useRef<HTMLDivElement>(null!);
    const linksRef = useRef<HTMLUListElement>(null!);

    useEffect(() => {
        let linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
            linksContainerRef.current.style.maxHeight = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.maxHeight = "0px";
        }
    }, [showLinks]);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return (
        <nav className="nav" ref={navbarRef}>
            <div className="nav__header">
                <Link to="/">
                    <h1 className="nav__header--heading">heroes</h1>
                </Link>
                <div
                    className={
                        showLinks
                            ? `nav-links__container show-container`
                            : "nav-links__container"
                    }
                    ref={linksContainerRef}
                >
                    <ul className="nav-links" ref={linksRef}>
                        {navLinks.map((link) => {
                            return (
                                // Used Navlink to get .active class by default, defined in layout => styles => components => navbar
                                <li key={link.path}>
                                    <NavLink
                                        className="nav-links__link"
                                        to={link.path}
                                        onClick={toggleLinks}
                                    >
                                        {link.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <button className="nav__toggle" onClick={toggleLinks}>
                    <FaBars />
                </button>
                <SearchForm />
            </div>
        </nav>
    );
};

export default Navbar;
