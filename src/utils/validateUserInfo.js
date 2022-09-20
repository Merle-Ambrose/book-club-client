import axios from "axios";
import { domainAPI } from "./mongoDBConnect";

export function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

export async function unameUnique(uname) {
    axios.get(domainAPI + "user/find/" + uname, {crossdomain: true})
        .then((response) => {
            console.log(response.data.isUnique);
            return response.data.isUnique;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

export async function isUserLoggedIn() {
    if(!localStorage.getItem('accessToken')) {
        console.log("User cannot perform this action because they aren't logged in.");
        alert("Please log in before completing this action.");
        window.location.assign("/login");
    }
}
