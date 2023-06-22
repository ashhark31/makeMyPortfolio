import axios from './axios';

export const postUser = (userData, callback) => {
    axios({
        method: 'POST',
        url: '/users/registration/add',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: userData
    }).then(async (res) => {
        const status = await res?.status;
        const data = await res?.data;
        callback(status,data?.email);
    }).catch(err => {
        const status = err?.response?.data?.statusCode;
        const message = err?.response?.data?.message;
        callback(status,message);
    })
}

export const getAllUsers = () => {
    axios.get('/users/registration/lists').then(async (res) => {
        const data = await res?.data;
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

export const getSpecificUser = (id) => {
    axios.get(`/users/registration/${id}`).then(async (res) => {
        const status = await res?.status;
        const data = await res?.data;
        console.log(status,data);
    }).catch(err => {
        const status = err?.response?.data?.statusCode;
        const message = err?.response?.data?.message;
        console.log(status,message);
    })
}

export const putUser = (id,userData) => {
    axios({
        method: 'PUT',
        url: `/users/registration/update/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: userData
    }).then(async (res) => {
        const status = await res?.status;
        const data = await res?.data;
        console.log(status,data);
    }).catch(err => {
        const status = err?.response?.data?.statusCode;
        const message = err?.response?.data?.message;
        console.log(err);
    })
}

export const deleteUser = (id) => {
    axios.delete(`/users/registration/delete/${id}`).then(async (res) => {
        const status = await res?.status;
        const data = await res?.data;
        console.log(status,data);
    }).catch(err => {
        const status = err?.response?.data?.statusCode;
        const message = err?.response?.data?.message;
        console.log(status,message);
    })
}