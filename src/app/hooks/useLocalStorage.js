import { useState } from "react";

const getLocalStorageValue = (key, initialVal) => {
    const itemFromLS = localStorage.getItem(key);
    return itemFromLS ? JSON.parse(itemFromLS) : initialVal;
};

const useLocalStorage = (key, initialVal) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        return getLocalStorageValue(key, initialVal);
    });

    const setValue = (value) => {
        // need to check if value is a function
        const valToStore =
            value instanceof Function ? value(localStorageValue) : value;
        // set to state
        setLocalStorageValue(value);
        localStorage.setItem(key, JSON.stringify(valToStore));
    };

    return [localStorageValue, setValue];
};

export default useLocalStorage;
