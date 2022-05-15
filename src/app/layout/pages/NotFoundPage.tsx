import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

interface Props {
    message?: string;
}

const NotFoundPage: React.FC<Props> = ({
    message = "Oops we couldn't find what you were looking for.",
}: Props) => {
    const { clearFields } = useAppContext();

    return (
        <div className="notfound">
            <div className="notfound__content">
                <h2 className="section-heading mb--3">{message}</h2>
                <Link
                    to="/"
                    className="btn btn--notfound"
                    onClick={clearFields}
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
