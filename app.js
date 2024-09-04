// API key for accessing the RapidAPI currency exchange service
const apiKey = '51df19a00fmsh524d9de0219ac7dp12fba3jsn8cad447812bc';

// Base URL for the currency exchange API
const baseURL = 'https://currency-exchange.p.rapidapi.com/exchange';

// Request options, including method and headers with API key and host information
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
  },
};

// Select elements from the DOM: dropdowns for currency selection, button, amount input, and message display
const dropdowns = document.querySelectorAll('.dropdowns select');
const btn = document.querySelector('.button');
const amount = document.querySelector('.amount');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

// Event listener to get the exchange rate as soon as the page loads
window.addEventListener('load', () => {
  getExchangeRate();
});

// Function to fetch the currency exchange rate and display the result
const getExchangeRate = async () => {
  let amountValue = amount.value;

  // If the amount is empty or less than 1, default it to 1
  if (amountValue === '' || amountValue < 1) {
    amountValue = 1;
    amount.value = '1';
  }

  // Construct the API request URL with the selected currencies and a fixed query amount of 1.0
  const url = ` ${baseURL}?from=${fromCurr.value}&to=${toCurr.value}&q=1.0;`;

  try {
    // Fetch the exchange rate from the API
    const response = await fetch(url, options);
    const rate = await response.json();

    // Calculate the final amount based on the fetched exchange rate
    let finalAmount = amountValue * rate;

    // Display the calculated amount and exchange rate in the message element
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
};

// Populate the dropdowns with currency codes from the `countryList` object
for (const select of dropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currencyCode; // Set the display text of the option
    newOption.value = currencyCode; // Set the value of the option

    // Set USD as the default 'from' currency and PKR as the default 'to' currency
    if (select.name === 'from' && currencyCode === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && currencyCode === 'PKR') {
      newOption.selected = 'selected';
    }

    // Append the new option to the dropdown
    select.appendChild(newOption);
  }

  // Add an event listener to update the flag when a currency is selected
  select.addEventListener('change', (event) => {
    updateFlag(event.target);
  });
}

// Function to update the flag image based on the selected currency
const updateFlag = (element) => {
  let currencyCode = element.value; // Get the selected currency code
  let countryCode = countryList[currencyCode]; // Get the corresponding country code
  let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Construct the flag image URL
  let img = element.parentElement.querySelector('img'); // Find the associated image element
  img.src = newImgSrc; // Update the image source to the new flag
};

// Event listener to fetch and display the exchange rate when the button is clicked
btn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  getExchangeRate(); // Fetch and display the exchange rate
});
