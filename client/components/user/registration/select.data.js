export const interest = [
    {
        key: 'it',
        value: 'IT'
    },
    {
        key: 'bpo',
        value: 'BPO'
    }
];

export const title = [
    {
        key: 'mr',
        value: 'Mr.'
    },
    {
        key: 'mrs',
        value: 'Mrs.'
    },
    {
        key: 'miss',
        value: 'Miss'
    },
];


export const appendCountriesData = (countries) => {
    
    let country = [{key:'',value:'None'}];
    let moreCountries = [];

    if(countries.length === undefined){
        return country;
    }

    try{
        moreCountries = countries.map(({isoCode,name}) => {
            return ({
                key: isoCode,
                value: name
            });
        })

    } catch(err){
        console.log(err);
    }

    return [...country, ...moreCountries];    
}

export const appendStatesData = (states) => {
    
    let state = [{key:'',value:'None'}];
    let moreStates = [];

    if(states.length === undefined){
        return state;
    }

    try{
        moreStates = states.map(({isoCode,name}) => {
            return ({
                key: isoCode,
                value: name
            });
        })

    } catch(err){
        console.log(err);
    }

    return [...state, ...moreStates];    
}

export const appendCitiesData = (cities) => {
    
    let city = [{key:'',value:'None'}];
    let moreCities = [];

    if(cities.length === undefined){
        return city;
    }

    try{
        moreCities = cities.map((name) => {
            return ({
                key: name,
                value: name
            });
        })

    } catch(err){
        console.log(err);
    }

    return [...city, ...moreCities];    
}