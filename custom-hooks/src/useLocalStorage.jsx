import { useState } from "react"

const useLocalStorage = (key, defaultValue) => {
    const [localStoragValue, setLocalStorageValue] = useState(() => {
        try {
            const val = localStorage.getItem(key);
            if(val){
                return JSON.parse(val);
            }
            else{
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } 
        catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    })

    const setLocalStorage = (valueOrFunc) => {
        let newValue;
        if(typeof(valueOrFunc) === 'function'){
            newValue = valueOrFunc(localStoragValue);
        }
        else{
            newValue = valueOrFunc;
        }
        localStorage.setItem(key, JSON.stringify(newValue))
        setLocalStorageValue(newValue);
    }

    return [localStoragValue, setLocalStorage];
}


export default useLocalStorage;