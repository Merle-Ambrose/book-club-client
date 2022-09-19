import React, { useState } from 'react';
import { domainAPI } from "./utils/mongoDBConnect";
import axios from 'axios';

async function getLogin(uname, pwd) {
    return axios.post(domainAPI + "login",
    {
        uname: uname,
        pwd: pwd
    },
    {crossdomain: true})
        .then(result => result.data)
        .catch(error => null);
}

function Login() {
    const [warningMsg, setWarningMsg] = new useState('');
    const [msgLoginUnsuccessful, setMsgLoginUnsuccessful] = new useState('');

    function submitForm(e) {
        // Prevent form submission
        e.preventDefault();

        // Trim all inputted values
        let warningFlag = false;
        let uname = e.target.uname.value.trim();
        let pwd = e.target.pwd.value;

        // Validate input (display warning if false)
        if(!uname) {
            warningFlag = true;
            document.getElementById('label-uname').style.color = "Red";
        }
        else {
            document.getElementById('label-uname').style.color = "Black";
        }
        if(!pwd) {
            warningFlag = true;
            document.getElementById('label-pwd').style.color = "Red";
        }
        else {
            document.getElementById('label-pwd').style.color = "Black";
        }
        
        if(warningFlag) {
            // Pull up a warning message that states
            // the user error.
            setWarningMsg('Enter valid values in the highlighted, red fields.');
            setMsgLoginUnsuccessful('');
        }
        else {
            setWarningMsg('');
            warningFlag = false;
            getLogin(uname, pwd)
                .then((userLoginInfo) => {
                    if(!userLoginInfo) {
                        document.getElementById('label-uname').style.color = "Red";
                        document.getElementById('label-pwd').style.color = "Red";
                        setMsgLoginUnsuccessful('User not found with those credentials. Please try again.');
                    }
                    else {
                        setMsgLoginUnsuccessful('');
                        // Store the user's login credentials
                        // to let the user sign in later
                        // (w/out logging in)
                        localStorage.setItem("accessToken", userLoginInfo.accessToken);
                        window.location.assign("/dashboard");
                    }
                });
        }
    }

    return (
        <form onSubmit={submitForm}>
            <h1>Login</h1><br/>
            <div style={{color: 'red'}}>
                <p>{ warningMsg }</p>
                <p>{ msgLoginUnsuccessful }</p>
                {(warningMsg || msgLoginUnsuccessful) ? <br/> : null}
            </div>
            <label htmlFor="uname" id="label-uname">Username:</label><br/>
            <input type="text" id="uname" name="uname"/><br/>
            <label htmlFor="pwd" id="label-pwd">Password:</label><br/>
            <input type="password" id="pwd" name="pwd"/><br/>
            <br/><button type="submit">Login</button><br/><br/>
            <p>Don't have an account? <a href='/register'>Register.</a></p>
        </form>
    );
}

export default Login;
