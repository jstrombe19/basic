
const order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const conversionForm = document.getElementById('conversion-form');
const convertedValue = document.getElementById('converted-value');
const convertedValueLabel = document.getElementById('converted-value-label');
const initialBase = document.getElementById('initial-base');
const convertedBase = document.getElementById('converted-base');
const conversionSelection = document.getElementById('conversion-selector-section');
const conversionBases = new Array;
const lowestBase = 10;
const highestBase = 64;

let convertFromBase = lowestBase;
let convertToBase = highestBase;

// dynamically generate base options
conversionBases.push(lowestBase);
conversionBases.push(highestBase);
conversionBases.forEach(baseValue => {
  const initialBaseOption = document.createElement('option')
  const convertedBaseOption = document.createElement('option')
  initialBaseOption.value = baseValue;
  convertedBaseOption.value = baseValue;
  initialBaseOption.innerText = baseValue;
  convertedBaseOption.innerText = baseValue;
  initialBase.append(initialBaseOption);
  convertedBase.append(convertedBaseOption);
});

// set the highest base option as the default value for the convertedBase dropdown
convertedBase.lastChild.setAttribute('selected', '');
convertedValueLabel.textContent = `Here is the base-${convertToBase} value: `;

conversionForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(conversionForm);
  const initialValue = formData.get('initial-value');
  // dynamic:: allow for bi-directional conversion
  if(convertFromBase == 10 && convertToBase == 64) {
    formData.set('converted-value', base10ToBase64(+initialValue));
    convertedValue.value = formData.get('converted-value');
  } else if(convertFromBase == 64 && convertToBase == 10) {
    formData.set('converted-value', base64ToBase10(initialValue));
    convertedValue.value = formData.get('converted-value'); 
  }
})

conversionSelection.addEventListener('input', function(event) {
  event.preventDefault();
  if(event.target == initialBase) {
    convertFromBase = event.target.value;
  } else {
    convertToBase = event.target.value;
    convertedValueLabel.textContent = `Here is the base-${convertToBase} value: `;
  }
  conversionForm.reset();
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


