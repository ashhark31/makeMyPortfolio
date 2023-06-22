import { headers } from "next/dist/client/components/headers";
import axios from "./axios"

export const postUserAuth = (userData,callback) => {
    axios({
        method: 'POST',
        url: '/users/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: userData
    }).then(async (res) => {
        const status = await res?.status;
        const data = await res?.data;
        localStorage.setItem("user-auth",JSON.stringify(data));
        callback(status,data?.user_id);
    }).catch(err => {
        const status = err?.response?.data?.statusCode;
        const message = err?.response?.data?.message;
        callback(status,message);
    })
}

export const getUserProfile = (token,id,callback) => {
    axios({
        method: 'GET',
        url: `/users/profile?_id=${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
    }).then(async (res) => {
        const data = await res?.data;
        callback(data[1]);
    }).catch(err => {
        console.log(err);
    })
}

export const postAdminAuth = (adminData,callback) => {
    axios({
        method: 'POST',
        url: '/admin/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: adminData
    }).then(async (res) => {
        const status = await res?.status;
        const data = await res?.data;
        localStorage.setItem("admin-auth", JSON.stringify(data));
        callback(status,data?.admin_email);
    }).catch(err => {
        const status = err?.response?.data?.statusCode;
        const message = err?.response?.data?.message;
        callback(status,message);
    })
}

export const getAdminProfile = (token,id) => {
    axios({
        method: 'GET',
        url: `/admin/profile?_email=${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
    }).then(async (res) => {
        const data = await res?.data;
    }).catch(err => {
        console.log(err);
    })
}