import React, { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    localStorage.removeItem('accessToken');
    alert("You have been logged out. Redirecting you to the main website page...");
    window.location.assign("/");
  }, []);

  return (
    <>
      <div className="w3-margin">
        <h1>Logged out!</h1>
      </div>
    </>
  );
}

export default Logout;
