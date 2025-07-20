async function fetchItems(url){
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


const debounce = (func, delay) => {
    if(typeof func !== 'function'){
        throw new Error('Not a Valid Function')
    }
    if(typeof delay !== 'number'){
        throw new Error('Not a Valid Number')
    }

    let timeout;
    return (...args) => {
        return new Promise((resolve) => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(async () => {
                const data = await func(...args);
                resolve(data);
            }, delay)
        })
    }

}

const debounceQuery = debounce(fetchItems, 1000);

export default debounceQuery;