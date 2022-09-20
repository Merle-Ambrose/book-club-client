import React, { useEffect, useState } from 'react';
import { domainAPI } from "./utils/mongoDBConnect";
import { validateEmail, unameUnique } from './utils/validateUserInfo';
import axios from 'axios';
import { activeProfile } from './utils/w3utils';

function Register() {
    let [warningMsg, setWarningMsg] = new useState('');
    let [pwdMatchMsg, setPwdMatchMsg] = new useState('');
    let [unameUniqueMsg, setUnameUniqueMsg] = new useState('');

    function submitForm(e) {
        // Prevent form submission
        e.preventDefault();
        // Trim all inputted values
        let warningFlag = false;
        let fname = e.target.fname.value.trim();
        let lname = e.target.lname.value.trim();
        let byear = e.target.byear.value;
        let uname = e.target.uname.value.trim();
        let email = e.target.email.value.trim();
        let pwd = e.target.pwd.value;
        let confPwd = e.target.confPwd.value;

        // Validate input (display warning if false)
        if (!byear || isNaN(byear)) {
            warningFlag = true;
            document.getElementById('label-byear').style.color = "Red";
        }
        else if (new Date().getFullYear() - parseInt(byear) < 13) {
            // Transfer to other site
            window.location.assign('https://poptropica.com/');
        }
        else {
            document.getElementById('label-byear').style.color = "Black";
        }
        if (!fname) {
            warningFlag = true;
            document.getElementById('label-fname').style.color = "Red";
        }
        else {
            document.getElementById('label-fname').style.color = "Black";
        }
        if (!lname) {
            warningFlag = true;
            document.getElementById('label-lname').style.color = "Red";
        }
        else {
            document.getElementById('label-lname').style.color = "Black";
        }
        // CHECK IF THE USERNAME IS UNIQUE!
        if (!uname) {
            warningFlag = true;
            document.getElementById('label-uname').style.color = "Red";
        }
        else if (!unameUnique(uname)) {
            warningFlag = true;
            document.getElementById('label-uname').style.color = "Red";
            setUnameUniqueMsg('Username already taken.');
        }
        else {
            setUnameUniqueMsg('');
            document.getElementById('label-uname').style.color = "Black";
        }
        if (!email || !validateEmail(email)) {
            warningFlag = true;
            document.getElementById('label-email').style.color = "Red";
        }
        else {
            document.getElementById('label-email').style.color = "Black";
        }
        if (!pwd) {
            warningFlag = true;
            document.getElementById('label-pwd').style.color = "Red";
        }
        else {
            document.getElementById('label-pwd').style.color = "Black";
        }
        if (!confPwd) {
            warningFlag = true;
            document.getElementById('label-confPwd').style.color = "Red";
        }
        else {
            document.getElementById('label-confPwd').style.color = "Black";
        }
        if (confPwd !== pwd) {
            warningFlag = true;
            document.getElementById('label-pwd').style.color = "Red";
            document.getElementById('label-confPwd').style.color = "Red";
            setPwdMatchMsg("Password and confirmation password fields do not match.");
        }
        else {
            setPwdMatchMsg("");
        }

        if (warningFlag) {
            // Pull up a warning message that states
            // the user error.
            setWarningMsg('Enter valid values in the highlighted, red fields.');
        }
        else {
            setWarningMsg('');
            axios.post(domainAPI + "register/", {
                uname: uname,
                email: email,
                pwd: pwd,
                fname: fname,
                lname: lname,
                byear: byear
            }, { crossdomain: true })
                .then((response) => {
                    window.location.assign('/login');
                })
                .catch((error) => {
                    console.log(error);
                    console.log("Something went wrong.");
                });
        }
    }

    useEffect(() => {
        activeProfile();
    })

    return (
        <div className="w3-margin">
            <form onSubmit={submitForm}>
                <h1>Register</h1><br />
                <div style={{ color: 'red' }}>
                    <p>{warningMsg}</p>
                    <p>{pwdMatchMsg}</p>
                    <p>{unameUniqueMsg}</p>
                    {(warningMsg || pwdMatchMsg || unameUniqueMsg) ? <br /> : null}
                </div>
                <label htmlFor="fname" id="label-fname">First Name:</label><br />
                <input type="text" id="fname" name="fname" /><br />
                <label htmlFor="lname" id="label-lname">Last Name:</label><br />
                <input type="text" id="lname" name="lname" /><br />
                <label htmlFor="byear" id="label-byear">Birth Year:</label><br />
                <input type="number" min="1904" max={new Date().getFullYear()} id="byear" name="byear" /><br />
                <label htmlFor="uname" id="label-uname">Username:</label><br />
                <input type="text" id="uname" name="uname" /><br />
                <label htmlFor="email" id="label-email">Email:</label><br />
                <input type="email" id="email" name="email" /><br />
                <label htmlFor="pwd" id="label-pwd">Password:</label><br />
                <input type="password" id="pwd" name="pwd" /><br />
                <label htmlFor="confPwd" id="label-confPwd">Confirm Password:</label><br />
                <input type="password" id="confPwd" name="confPwd" /><br />
                <br /><button className="w3-btn w3-white w3-border w3-border-black w3-round w3-margin-top" type="submit">Register</button><br /><br />
                <p>Already have an account? <a href='/login'>Login.</a></p>
            </form>
        </div>
    );
}

export default Register;
