let countries = [];

// Fetch data from local JSON file
async function fetchCountries() {
    const response = await fetch('data.json');
    countries = await response.json();
    return countries;
}

// Display countries on the main page
async function displayCountries() {
    const countries = await fetchCountries();
    const countryList = document.getElementById('countryList');
    countryList.innerHTML = '';

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
            <img src="${country.flag}" alt="${country.name}">
            <div class="info">
                <h3>${country.name}</h3>
                <p>Population: ${country.population}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital}</p>
            </div>
        `;
        countryDiv.addEventListener('click', () => displayCountryDetails(country));
        countryList.appendChild(countryDiv);
    });
}

// Search countries
document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const countries = document.querySelectorAll('.country');
    countries.forEach(country => {
        const name = country.querySelector('h3').innerText.toLowerCase();
        if (name.includes(query)) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
    });
});

// Filter countries by region
document.getElementById('regionFilter').addEventListener('change', (event) => {
    const region = event.target.value;
    const countries = document.querySelectorAll('.country');
    countries.forEach(country => {
        const countryRegion = country.querySelector('.info p:nth-child(2)').innerText.split(': ')[1];
        if (region === '' || countryRegion === region) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
    });
});

// Display country details
function displayCountryDetails(country) {
    const countryDetails = document.getElementById('countryDetails');
    const countryList = document.getElementById('countryList');

    countryDetails.innerHTML = `
        <button id="backButton">Back</button>
        <img src="${country.flag}" alt="${country.name}">
        <h1>${country.name}</h1>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p>
        <p>Sub Region: ${country.subregion}</p>
        <p>Capital: ${country.capital}</p>
        <p>Top Level Domain: ${country.topLevelDomain.join(', ')}</p>
        <p>Currencies: ${country.currencies.map(c => c.name).join(', ')}</p>
        <p>Languages: ${country.languages.map(l => l.name).join(', ')}</p>
        <p>Border Countries:</p>
        <div id="borders">${country.borders.map(border => `<button class="border-btn">${border}</button>`).join(' ')}</div>
    `;

    document.getElementById('backButton').addEventListener('click', () => {
        countryDetails.classList.add('hidden');
        countryList.classList.remove('hidden');
    });

    document.querySelectorAll('.border-btn').forEach(button => {
        button.addEventListener('click', () => {
            const borderCountry = countries.find(c => c.alpha3Code === button.innerText);
            displayCountryDetails(borderCountry);
        });
    });

    countryDetails.classList.remove('hidden');
    countryList.classList.add('hidden');
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    displayCountries();
});
