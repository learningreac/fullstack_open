import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Countries from './components/Countries';

import CountryInfoService from './services/countrieInfo';
// import { countriesdata } from './mockdata';

const baseUrl = 'https://restcountries.com/v3.1/name';
const App = () => {
    const [input, SetInput] = useState('');
    const [countries, SetCountries] = useState([]);
    const { data:countrydata, error } = useSWR(`${baseUrl}/${input}`, CountryInfoService.fetcher);
    console.log("data", countrydata, error);

    useEffect(() => {
        CountryInfoService.getAll(input)
            .then(initialData => {
                SetCountries(initialData)
            })

    }, [input])



    const handleInputChange = (e) => {
        SetInput(e.target.value);
    };

    const handleShowInfo = (name) => {
        let targetCountry = countries.find(country => country.name.common === name);
        // console.log(targetCountry);
        // console.log(typeof targetCountry); // OBJ
        SetCountries([targetCountry]);
    };


    return (
        <div className='container'>
            <h1> Find Countries:</h1>
            <input value={input} onChange={handleInputChange} />
            <Countries countries={countries} input={input} showInfo={handleShowInfo} />
        </div>
    )
};

export default App;