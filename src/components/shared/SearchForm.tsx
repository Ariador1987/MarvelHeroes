import React, { useEffect } from "react";
import { useAppContext } from "../../app/context/AppContext";

const SearchForm = () => {
    const {
        setSearchTerm,
        setIsLoading,
        setCurrentPage,
        inputRef,
        setOffset,
    } = useAppContext();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    let timeout: any;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearchTerm(e.target.value.toLowerCase());
            /* 
                need to reset offset here because if im listing heroes and am on the page
                that doesnt exist for the new results a bug occurs and I get the notfound page.
            */
            setOffset((prevState): string | number => {
                if (Number.parseInt(prevState.toString()) !== 0) {
                    return "";
                }
                return prevState;
            });
            setCurrentPage((prevState) => (prevState !== 1 ? 1 : prevState));
        }, 1000);
    };

    return (
        <form className="nav__form" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className="nav__form--input"
                placeholder="search by name eg. Ares"
                ref={inputRef}
                onChange={handleChange}
            />
        </form>
    );
};

export default SearchForm;
