import dayjs from "dayjs";

export const fieldsData = () => {
    return [ 
        'Email', 'Interest', 'Title', 
        'Full name', 'Mobile', 
        'Birth', 'Skills',
        'City', 'State', 'Country'
    ]
}

export const userProfileData = (user) => {
    
    const firstChar = user.firstName.charAt(0);
    const middleChar = user.middleName.charAt(0);
    const lastChar = user.lastName.charAt(0);
    const fullName = user.firstName+' '+user.middleName+' '+user.lastName;
    const birthDate = dayjs(user.birth).format("DD/MM/YYYY");

    return [
        {
            img: firstChar + middleChar + lastChar,
            username: user.title + " " + user.firstName,
        },
        {
            0: user.email,
            1: user.interest,
            2: user.title,
            3: fullName,
            4: user.mobile,
            5: birthDate,
            6: user.skills,
            7: user.city,
            8: user.state,
            9: user.country
        },
    ];  
}