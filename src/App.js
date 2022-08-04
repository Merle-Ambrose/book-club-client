// https://medium.com/zero-equals-false/how-to-connect-a-react-frontend-with-node-js-bccb1fb7e2bb

import React from 'react';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import Test from './Test';
import Register from './Register';
import Book from './Book';
import Temp from './Temp';

function App() {
  /*
  // Test stuff
  useEffect(() => {
   axios.get("http://localhost:9000/test/", {crossdomain: true})
    .then(response => {
      console.log(response.data.users);
      setBackendData(response.data.users);
    });
  }, []);
  */

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/book/:bookId/chapter/:chapterId" element={<Book />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/temp" element={<Temp/>} />
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>


      {
        /*
        // Old test code
        <ul>
        {
          // Old, test code
          backendData.map((user, i) => {
            console.log(user);
            return (<p key={i}>{user}</p>);
          })
        }
        </ul>
        */
      }
    </div>
  );
}

export default App;
