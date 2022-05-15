import { FaChevronUp } from "react-icons/fa";
import { useAppContext } from "../../app/context/AppContext";

const BtnBackToTop = () => {
    const { navbarIsVisible, navbarRef } = useAppContext();

    return (
        <button
            onClick={() => {
                navbarRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            className={
                navbarIsVisible
                    ? "btn btn--back-to-top btn--animated hidden"
                    : "btn btn--back-to-top btn--animated animate-button"
            }
        >
            <FaChevronUp size={25} />
        </button>
    );
};

export default BtnBackToTop;
