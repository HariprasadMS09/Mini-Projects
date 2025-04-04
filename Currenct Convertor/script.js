const apiKey = "6cce606399a543ace0412354"; // Your API key
const apiBaseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// DOM elements
const fromCurrency = document.querySelector('select[name="from"]');
const toCurrency = document.querySelector('select[name="to"]');
const fromAmount = document.querySelector('input[type="number"]');
const toAmount = document.querySelectorAll('input[type="number"]')[1];
const valueDisplayer = document.querySelector('.valueDisplayer');
const fromFlag = document.querySelectorAll('.country img')[0];
const toFlag = document.querySelectorAll('.country img')[1];
const converterSymbol = document.getElementById('converterSymbol');

// Populate select options
function populateCurrencyOptions() {
  Object.keys(countryList).forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    const option2 = option1.cloneNode(true);
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });
}

// Fetch exchange rate and update the conversion
async function fetchExchangeRate() {
  const fromCurrencyCode = fromCurrency.value;
  const toCurrencyCode = toCurrency.value;
  
  try {
    const response = await fetch(`${apiBaseUrl}${fromCurrencyCode}`);
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.conversion_rates[toCurrencyCode];
      const convertedValue = (fromAmount.value * rate).toFixed(2);

      // Update display and converted amount
      valueDisplayer.querySelector('.line1 span').textContent = `${fromAmount.value} ${fromCurrencyCode} Equals`;
      valueDisplayer.querySelector('.line2 h3').textContent = `${convertedValue} ${toCurrencyCode}`;
      toAmount.value = convertedValue;
    } else {
      console.error("Error fetching conversion rates:", data.error_type);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Update flag based on selected currency
function updateFlag(selectElement, flagElement) {
  const countryCode = countryList[selectElement.value];
  flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Event listeners
fromCurrency.addEventListener("change", () => {
  updateFlag(fromCurrency, fromFlag);
  fetchExchangeRate();
});
toCurrency.addEventListener("change", () => {
  updateFlag(toCurrency, toFlag);
  fetchExchangeRate();
});
fromAmount.addEventListener("input", fetchExchangeRate);
converterSymbol.addEventListener("click", () => {
  // Swap the selected currencies
  const tempCurrency = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCurrency;

  // Swap the flags
  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);

  // Fetch new exchange rate with swapped currencies
  fetchExchangeRate();
});

// Initial setup
populateCurrencyOptions();
fromCurrency.value = "USD"; // Default 'from' currency
toCurrency.value = "INR";   // Default 'to' currency
updateFlag(fromCurrency, fromFlag);
updateFlag(toCurrency, toFlag);
fetchExchangeRate();
