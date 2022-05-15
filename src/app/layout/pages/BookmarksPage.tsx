import HeroCard from "../../../components/shared/HeroCard";
import { useAppContext } from "../../context/AppContext";
import NotFoundPage from "./NotFoundPage";
import { Hero } from "../../models/hero";

const BookmarksPage = () => {
    const { bookmarks } = useAppContext();

    if (!bookmarks || bookmarks.length === 0) {
        return <NotFoundPage message="No favorites added yet" />;
    }

    return (
        <main className="main">
            <section className="bookmarks">
                <h2 className="section-heading section-heading--bookmarks mb--2">
                    Favorites
                </h2>
                <div className="underline underline--secondary"></div>
                <div className="grid grid--5x1 mb--3">
                    {bookmarks.map((favorite: Hero) => {
                        const { id } = favorite;
                        return <HeroCard key={id} {...favorite} />;
                    })}
                </div>
            </section>
        </main>
    );
};

export default BookmarksPage;
