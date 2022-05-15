import Buttons from "../../../components/home/PaginationButtons";
import HeroCard from "../../../components/shared/HeroCard";
import LoadingComponent from "../../../components/shared/LoadingIndicator";
import { useAppContext } from "../../context/AppContext";
import { Hero } from "../../models/hero";
import NotFoundPage from "./NotFoundPage";

const HomePage = () => {
    const { heroes, isLoading } = useAppContext();

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (!heroes || heroes.length === 0) {
        return <NotFoundPage message="No heroes available under that name" />;
    }

    return (
        <main className="main">
            <section className="heroes">
                <h2 className="section-heading mb--2">
                    Browse your favorite heroes
                </h2>
                <div className="underline"></div>
                <div className="container--buttons mb--3">
                    <Buttons />
                </div>
                <div className="grid grid--5x1 mb--3">
                    {heroes.map((hero: Hero) => {
                        const { id } = hero;
                        return <HeroCard key={id} {...hero} />;
                    })}
                </div>
            </section>
        </main>
    );
};

export default HomePage;
