import { addLogin } from "../../../redux/user/login.slice";

let loginData = {};
let formData = new FormData();

const getKey = (name) => {
    
    let value = name;
    
    if(name.charAt(0) === '*'){
        value = name.slice(1);
    }

    const keys = value.split('_');
    let key = '';

    if(keys.length > 1){
        const firstValue = keys[0].toLowerCase();
        const secondValue = keys[1];
        key = firstValue + secondValue.charAt(0).toUpperCase() +        secondValue.slice(1);
    } else {
        key = keys[0].toLowerCase();
    }

    return key;
}

export const handleChange = (e,callback) => {
    
    const name = e.target.name;
    const key = getKey(name);
    const value = e.target.value;

    if(formData.has(key)){
        formData.set(key,value);
    } else {
        formData.append(key,value);
    }

    formData.forEach((value,key) => {
        loginData[key] = value;
    })

    callback(addLogin(loginData));
}