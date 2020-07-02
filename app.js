console.log('FULL SEND!');

const order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const conversionForm = document.getElementById('conversion-form');

conversionForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(conversionForm);
  const numericValue = formData.get('numeric-value');
  // dynamic:: allow for bi-directional conversion
  formData.set('converted-value', base10ToBase64(+numericValue));
  const convertedValue = formData.get('converted-value');
  console.log(convertedValue);
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


