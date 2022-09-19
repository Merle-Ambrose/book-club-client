import axios from "axios";
import { domainAPI } from "./mongoDBConnect";

export const authAxios = axios.create({
    baseURL: domainAPI,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});
