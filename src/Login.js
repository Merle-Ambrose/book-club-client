import React, { useState } from 'react';
import { domainAPI, domainClient } from "./utils/mongoDBConnect";
import axios from 'axios';

async function loginSuccessful(uname, pwd) {
    axios.get(domainAPI + "login/" + uname + "/" + pwd, {crossdomain: true})
        .then((response) => {
            return response.data.loginSuccess;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

function Login() {
    let [warningMsg, setWarningMsg] = new useState('');
    let [msgLoginUnsuccessful, setMsgLoginUnsuccessful] = new useState('');

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
            if(!loginSuccessful(uname, pwd)) {
                document.getElementById('label-uname').style.color = "Red";
                setMsgLoginUnsuccessful('User not found with those credentials. Please try again.');
            }
            else {
                setMsgLoginUnsuccessful('');
                axios.get(domainAPI + "login/" + uname + "/" + pwd, {crossdomain: true})
                    .then((response) => {
                        window.location.assign('/dashboard');
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Something went wrong.");
                    });
            }
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
