import React, { useState, useCallback } from 'react'

const useInput = (inputValue) => {
    const [value, setter] = useState(inputValue);

    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);

    return [value, handler]
}

export default useInput;