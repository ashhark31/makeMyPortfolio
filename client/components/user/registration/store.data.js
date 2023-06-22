import { setPasswordElement } from "../../../redux/user/element.slice";
import { addRegistration } from "../../../redux/user/registration.slice";

let formData = new FormData();
let registrationData = {};

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

export const handleChange = (name,value,callback, dispatch) => {
    
    if(name !== "*Middle_Name" && name !== "*Skills"){
        value === '' ? callback('error') 
        : callback('default');
    }
    
    const key = getKey(name);

    if(key === "confirmPassword"){
        dispatch(setPasswordElement(value));
        return;
    }

    if(formData.has(key)){
        formData.set(key,value);
    } else {
        formData.append(key,value);
    }

    formData.forEach((value,key) => {
        if(key === 'birth'){
            registrationData[key] = new Date(value);    
        } else if(key === 'skills'){
            registrationData[key] = value.split(",");
        } else{
            registrationData[key] = value;
        }
    })

    dispatch(addRegistration(registrationData));
}