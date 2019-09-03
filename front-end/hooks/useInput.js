import React, {useState} from 'react'

const useInput = (inputValue) => {
    const [value, setter] = useState(inputValue);

    const handler = (e) => {
        setter(e.target.value);
    };

    return [value, handler]
}

export default useInput;