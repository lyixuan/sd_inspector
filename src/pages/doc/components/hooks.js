import React, { useState, useEffect } from 'react';


// export default class Hooks extends React.Component {
//     render() {
//         return (
//             <div>3333</div>
//         )
//     }
// }
export default function Hooks() {
    const [count, setCount] = useState(3);
    const [name, setName] = useState('sssss');
    useEffect(() => {
        document.title = `haha${name}`
    })
    return (
        <div onClick={() => { setCount(count + 1); setName(name + 'de') }}>
            <div>{name}</div>
            {count}</div>
    )
}