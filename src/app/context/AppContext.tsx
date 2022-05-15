import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react";
import { Hero } from "../models/hero";
import { mapToTypeHero } from "../utilities/utilities";
import { paramsFactory } from "../utilities/paramsFactory";
import useLocalStorage from "../hooks/useLocalStorage";

const API_BASE_URL = "https://gateway.marvel.com:443/v1/public/characters?";
interface AppContext {
    heroes: Hero[] | null;
    bookmarks: any;
    isLoading: boolean;
    inputRef: React.MutableRefObject<HTMLInputElement>;
    navbarRef: React.MutableRefObject<HTMLDivElement>;
    offset: number | string;
    totalCount: number;
    currentPage: number;
    navbarIsVisible: boolean;
    clearFields: () => void;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setOffset: Dispatch<SetStateAction<string | number>>;
    setHeroes: Dispatch<SetStateAction<Hero[]>>;
    setBookmarks: Dispatch<SetStateAction<Hero[]>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

// eslint-disable-next-line
const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren<any>) => {
    const [heroes, setHeroes] = useState<Hero[] | null>(null);
    const [bookmarks, setBookmarks] = useLocalStorage("favorites", []);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState<string | number>(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [navbarIsVisible, setNavBarIsVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null!);
    const navbarRef = useRef<HTMLDivElement>(null!);

    const fetchHeroes = useCallback(async () => {
        try {
            const params = paramsFactory(searchTerm, offset.toString());
            const response = await fetch(`${API_BASE_URL}${params.toString()}`);
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText);
            }
            const data = await response.json();
            // offsetname clash, default val for first time init only
            const { results, offset: initialOffset, total } = data.data;
            setTotalCount(total);
            setOffset(initialOffset);
            setHeroes(mapToTypeHero(results));
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, [searchTerm, offset]);

    useEffect(() => {
        fetchHeroes();
    }, [fetchHeroes]);

    // used by back-to-top btn
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setNavBarIsVisible(entry.isIntersecting);
        });
        observer.observe(navbarRef.current);
    }, []);

    // utility func
    const clearFields = () => {
        setSearchTerm("");
        inputRef.current.value = "";
    };

    return (
        <AppContext.Provider
            value={{
                heroes,
                bookmarks,
                totalCount,
                currentPage,
                offset,
                isLoading,
                inputRef,
                navbarRef,
                navbarIsVisible,
                clearFields,
                setHeroes,
                setBookmarks,
                setIsLoading,
                setSearchTerm,
                setOffset,
                setCurrentPage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined)
        throw new Error("Error: We are not inside the provider.");

    return context;
};
