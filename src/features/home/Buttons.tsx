import { useAppContext } from "../../app/context/AppContext";
import { ITEM_MAX_LIMIT } from "../../app/utilities/paramsFactory";

const Buttons = () => {
    const {
        offset,
        currentPage,
        totalCount,
        isLoading,
        setOffset,
        setIsLoading,
        setCurrentPage,
    } = useAppContext();

    const handleDecrement = () => {
        // user is on first page
        if (offset === 0) return;
        setIsLoading(true);
        setOffset((prevOffset): string | number => {
            const newState =
                Number.parseInt(prevOffset.toString()) -
                Number.parseInt(ITEM_MAX_LIMIT);

            if (newState < 0) {
                return prevOffset.toString();
            }

            setCurrentPage((prevPage) => prevPage - 1);
            return newState;
        });
    };

    const handleIncrement = () => {
        // user is on last page
        if (+offset + +ITEM_MAX_LIMIT >= totalCount) return;
        setIsLoading(true);
        setOffset((prevOffset): string | number => {
            const newState =
                Number.parseInt(prevOffset.toString()) +
                Number.parseInt(ITEM_MAX_LIMIT);

            if (newState < totalCount) {
                setCurrentPage((prevPage) => prevPage + 1);
                return newState;
            }

            return prevOffset.toString();
        });
    };

    return (
        <>
            <button
                disabled={isLoading}
                className="btn btn--prev"
                onClick={handleDecrement}
            >
                Prev
            </button>
            <p className="page-info">
                {currentPage} <span>/</span>{" "}
                {Math.ceil(totalCount / +ITEM_MAX_LIMIT)}
            </p>
            <button
                disabled={isLoading}
                className="btn btn--next"
                onClick={handleIncrement}
            >
                Next
            </button>
        </>
    );
};

export default Buttons;
