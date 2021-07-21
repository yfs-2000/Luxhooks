import React, {useRef} from 'react';
import {useClickAway} from 'index'
const App = () => {
    const refs = useRef(null)

    const xx =useClickAway(refs,()=>{
        console.log(123)
    })
    return (
        <div>
            <button ref={refs}>123</button>
        </div>
    );
};

export default App;
