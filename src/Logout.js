import React, { useEffect } from 'react';

function Logout() {
    useEffect(() => {
        localStorage.removeItem('accessToken');
    }, []);

  return (
    <div>Logout</div>
  );
}

export default Logout;
