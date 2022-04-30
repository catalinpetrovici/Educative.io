function validate(event) {
  const inputElement = event.target;
  inputElement.classList.add('signup__field__input--error');

  const errorMessageElement = event.target.parentElement.getElementsByClassName(
    'signup__field__error'
  )[0];
  errorMessageElement.innerHTML = 'Sample Error';
}

const inputs = document.getElementsByClassName('signup__field__input');

for (const input of inputs) {
  input.onblur = validate;
}
