console.log('FULL SEND!');

const order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const conversionForm = document.getElementById('conversion-form');
const convertedValue = document.getElementById('converted-value');
const convertedValueLabel = document.getElementById('converted-value-label');
const initialBase = document.getElementById('initial-base');
const convertedBase = document.getElementById('converted-base');
const conversionBases = new Array;
const lowestBase = 10;
const highestBase = 64;

convertedValueLabel.textContent = `Here is the base-${order.length} value: `;

// dynamically generate base options
conversionBases.push(lowestBase);
conversionBases.push(highestBase);
conversionBases.forEach(baseValue => {
  const baseOption = document.createElement('option')
  baseOption.value = baseValue;
  baseOption.innerText = baseValue;
  initialBase.append(baseOption);
});
conversionBases.forEach(baseValue => {
  const baseOption = document.createElement('option')
  baseOption.value = baseValue;
  baseOption.innerText = baseValue;
  convertedBase.append(baseOption);
});
// set the highest base option as the default value for the convertedBase dropdown
convertedBase.lastChild.setAttribute('selected', true);

conversionForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(conversionForm);
  const numericValue = formData.get('numeric-value');
  // dynamic:: allow for bi-directional conversion
  formData.set('converted-value', base10ToBase64(+numericValue));
  convertedValue.value = formData.get('converted-value');
})

conversionForm.addEventListener('change', function(event) {
  event.preventDefault();
  const numericValue = document.getElementById('numeric-value');
  const convertedValue = document.getElementById('converted-value');
})

function base10ToBase64(number) {
  // dynamic:: order is an object, provided a key based on a dropdown selection
  const base = order.length;
  let string = "", r;

  while (number) {
    r = number % base
    number -= r;
    number /= base;
    string = order.charAt(r) + string;
  }
  return string;
}

// dynamic:: the current configuration is only forward-compatible, meaning you can convert
// a base-10 integer value into a base-64 string. 

function base64ToBase10(string) {
  // dynamic:: order is an object, provided a key based on a dropdown selection
  const base = order.length;
  let number = 0, r;
  while (string.length) {
    r = order.indexOf(string.charAt(0));
    string = string.substr(1);
    number *= base;
    number += r;
  }
  return number;
}


