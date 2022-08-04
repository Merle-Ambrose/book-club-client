import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
    const [backendData, setBackendData] = useState([]);
    
    useEffect(() => {
    axios.get("http://localhost:9000/test/", {crossdomain: true})
    .then(response => {
        console.log(response.data.users);
        setBackendData(response.data.users);
    });
    }, []);

    return (
        <ul>
        {
          // Old, test code
          backendData.map((user, i) => {
            console.log(user);
            return (<p key={i}>{user}</p>);
          })
        }
        </ul>
    );
}

export default Test;
