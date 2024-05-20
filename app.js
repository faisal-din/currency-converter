const apiKey = '51df19a00fmsh524d9de0219ac7dp12fba3jsn8cad447812bc';
const baseURL = 'https://currency-exchange.p.rapidapi.com/exchange';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
  },
};

const dropdowns = document.querySelectorAll('.dropdowns select');
const btn = document.querySelector('.button');
const amount = document.querySelector('.amount');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

window.addEventListener('load', () => {
  getExchangeRate();
});

// Fetching currency exchange rate
const getExchangeRate = async () => {
  let amountValue = amount.value;
  if (amountValue === '' || amountValue < 1) {
    amountValue = 1;
    amount.value = '1';
  }

  const url = ` ${baseURL}?from=${fromCurr.value}&to=${toCurr.value}&q=1.0;`;
  try {
    const response = await fetch(url, options);
    const rate = await response.json();

    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
  }
};

// Populating dropdowns with currency codes
for (const select of dropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;

    // Set default currency selections
    if (select.name === 'from' && currencyCode === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && currencyCode === 'PKR') {
      newOption.selected = 'selected';
    }
    select.appendChild(newOption);
  }

  select.addEventListener('change', (event) => {
    updateFlag(event.target);
  });
}

// Update flag images
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newImgSrc;
};

//show exchange rate on button click

btn.addEventListener('click', (e) => {
  e.preventDefault();
  getExchangeRate();
});
