import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../app/context/AppContext";
import { Hero } from "../../app/models/hero";
import { doesItemExist } from "../../app/utilities/utilities";

const HeroCard = ({ id, description, name, appearances, image }: Hero) => {
    const { heroes, setHeroes, bookmarks, setBookmarks } = useAppContext();
    const isBookmarked = doesItemExist(bookmarks, id);
    const location = useLocation();

    const handleAdd = () => {
        const item = heroes.find((x) => x.id === id);
        const newItem = { ...item, isFavorite: true };
        const itemIndex = heroes.findIndex((x) => x.id === id);
        const stateToUpdate = [...heroes];
        stateToUpdate.splice(itemIndex, 1, newItem);
        setBookmarks((prevState) => {
            return doesItemExist(prevState, newItem.id)
                ? prevState
                : [...prevState, newItem];
        });
        setHeroes(stateToUpdate);
    };

    const handleRemove = () => {
        setBookmarks((prevState) => prevState.filter((hero) => hero.id !== id));
    };

    return (
        <article className="card">
            <figure className="card__figure">
                <span className="card__figure--appearances">
                    {appearances}
                    <small>appearances</small>
                </span>
                {isBookmarked && (
                    <span className="card__figure--favorite">
                        <FaStar />
                    </span>
                )}
                <img className="card__figure--image" src={image} alt={name} />
                <figcaption className="card__figure--title">
                    {name.length < 20 ? name : `${name.substring(0, 20)}...`}
                </figcaption>
            </figure>
            <p className="card__content">
                {description ? description : "No description"}
            </p>
            <button
                type="button"
                disabled={doesItemExist(bookmarks, id) === true}
                className="card__cta"
                onClick={handleAdd}
            >
                {isBookmarked ? "added!" : "bookmark"}
            </button>
            {location.pathname.includes("/bookmarks") && (
                <button className="card__remove" onClick={handleRemove}>
                    Remove
                </button>
            )}
        </article>
    );
};

export default HeroCard;
