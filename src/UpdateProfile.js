import React, { useEffect, useState } from 'react';
import { authAxios } from './utils/axiosConnect';
import { domainAPI } from './utils/mongoDBConnect';
import { validateEmail } from './utils/validateUserInfo';
import { isUserLoggedIn } from './utils/validateUserInfo';

function UpdateProfile() {
    const [warningMsg, setWarningMsg] = new useState('');
    const [pwdMatchMsg, setPwdMatchMsg] = new useState('');
    const [unameUniqueMsg, setUnameUniqueMsg] = new useState('');

    function updateUser(e) {
        // Prevent form submission
        e.preventDefault();
        isUserLoggedIn();

        // Trim all inputted values
        let warningFlag = false;
        let pwdUpdate = false;
        let fname = document.getElementById("fname").value.trim();
        let lname = document.getElementById("lname").value.trim();
        let byear = document.getElementById("byear").value;
        let email = document.getElementById("email").value.trim();
        let pwd = document.getElementById("pwd").value;
        let confPwd = document.getElementById("confPwd").value;

        // Validate input (display warning if false)
        if(!byear || isNaN(byear)) {
            warningFlag = true;
            document.getElementById('label-byear').style.color = "Red";
        }
        else if(new Date().getFullYear()-parseInt(byear) < 13) {
            // Transfer to other site
            window.location.assign('https://poptropica.com/');
        }
        else {
            document.getElementById('label-byear').style.color = "Black";
        }
        if(!fname) {
            warningFlag = true;
            document.getElementById('label-fname').style.color = "Red";
        }
        else {
            document.getElementById('label-fname').style.color = "Black";
        }
        if(!lname) {
            warningFlag = true;
            document.getElementById('label-lname').style.color = "Red";
        }
        else {
            document.getElementById('label-lname').style.color = "Black";
        }
        if(!email || !validateEmail(email)) {
            warningFlag = true;
            document.getElementById('label-email').style.color = "Red";
        }
        else {
            document.getElementById('label-email').style.color = "Black";
        }
        if(confPwd !== pwd) {
            warningFlag = true;
            document.getElementById('label-pwd').style.color = "Red";
            document.getElementById('label-confPwd').style.color = "Red";
            setPwdMatchMsg("Password and confirmation password fields do not match.");
        }
        else {
            setPwdMatchMsg("");
            // Check if both password fields were filled in
            if(pwd && confPwd) {
                document.getElementById('label-pwd').style.color = "Black";
                document.getElementById('label-confPwd').style.color = "Black";
                pwdUpdate = true;
            }
        }
        
        if(warningFlag) {
            // Pull up a warning message that states
            // the user error.
            setWarningMsg('Enter valid values in the highlighted, red fields.');
        }
        else {
            setWarningMsg('');
            if(!pwdUpdate) {
                authAxios.post(domainAPI + "updateUserNotPwd/", {
                    email: email,
                    fname: fname,
                    lname: lname,
                    byear: byear
                }, {crossdomain: true})
                    .then((response) => {
                        alert("User info updated!");
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Something went wrong.");
                    });
            }
            else {
                authAxios.post(domainAPI + "updateUser/", {
                    email: email,
                    pwd: pwd,
                    fname: fname,
                    lname: lname,
                    byear: byear
                }, {crossdomain: true})
                    .then((response) => {
                        alert("User info updated!");
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Something went wrong.");
                    });
            }
        }
    }

    useEffect(() => {
        isUserLoggedIn();
        authAxios.get(domainAPI + "getUser", {crossdomain: true})
            .then((result) => {
                document.getElementById("fname").value = result.data.fname;
                document.getElementById("lname").value = result.data.lname;
                document.getElementById("byear").value = result.data.birthday;
                document.getElementById("email").value = result.data.email;
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

  return (
    <form onSubmit={updateUser}>
        <h1>Update Information</h1><br/>
        <div style={{color: 'red'}}>
            <p>{ warningMsg }</p>
            <p>{ pwdMatchMsg }</p>
            {(warningMsg || pwdMatchMsg) ? <br/> : null}
        </div>
        <label htmlFor="fname" id="label-fname">First Name:</label><br/>
        <input type="text" id="fname" name="fname"/><br/>
        <label htmlFor="lname" id="label-lname">Last Name:</label><br/>
        <input type="text" id="lname" name="lname"/><br/>
        <label htmlFor="byear" id="label-byear">Birth Year:</label><br/>
        <input type="number" min="1904" max={new Date().getFullYear()} id="byear" name="byear"/><br/>
        <label htmlFor="email" id="label-email">Email:</label><br/>
        <input type="email" id="email" name="email"/><br/>
        <label htmlFor="pwd" id="label-pwd">New Password:</label><br/>
        <input type="password" id="pwd" name="pwd"/><br/>
        <label htmlFor="confPwd" id="label-confPwd">Confirm New Password:</label><br/>
        <input type="password" id="confPwd" name="confPwd"/><br/>
        <br/><button type="submit">Update User Information</button>
    </form>
  );
}

export default UpdateProfile;
