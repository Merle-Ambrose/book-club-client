import React, { useEffect } from 'react';
import axios from 'axios';
import { domainAPI, domainClient } from "./utils/mongoDBConnect";

function Temp() {
  useEffect(() => {
    console.log("temp useEffect called");
    axios.get("/temp", {crossdomain: true})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
  }, []);

  return (
    <div>Temp</div>
  );
}

export default Temp;
