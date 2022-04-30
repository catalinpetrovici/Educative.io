function isValidName(name) {
  // TODO
}

function isValidEmail(name) {
  // TODO
}

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

// Unit Tests

function runTests() {
  firstNameTest();
  emailTest();
}

runTests();

function runner({ inputs, expectedOutputs, func }) {
  let results = '';
  for (let i = 0; i < inputs.length; i++) {
    const passFailString =
      func(inputs[i]) === expectedOutputs[i]
        ? 'Pass'
        : '<span style="color: red">Fail</span>';
    const result = `${func.name}(${inputs[i]}) === ${expectedOutputs[i]}: ${passFailString}`;
    results += result + '<br>';
  }
  const resultsElement = document.getElementsByClassName('results')[0];
  resultsElement.innerHTML += results + '<br>';
}

function firstNameTest() {
  const invalidInputs = ['@', '', 'blah$', '123'];
  const validInputs = ['asdf', 'Alfred', 'ALFRED'];

  runner({
    inputs: validInputs,
    expectedOutputs: validInputs.map((_) => true),
    func: isValidName,
  });

  runner({
    inputs: invalidInputs,
    expectedOutputs: invalidInputs.map((_) => false),
    func: isValidName,
  });
}

function emailTest() {
  const invalidEmails = ['@asdf.com', 'what@what', '', '..'];
  const validEmails = ['asdf@asdf.com', 'what@what.au', 'a@a.c'];

  runner({
    inputs: validEmails,
    expectedOutputs: validEmails.map((_) => true),
    func: isValidEmail,
  });

  runner({
    inputs: invalidEmails,
    expectedOutputs: invalidEmails.map((_) => false),
    func: isValidEmail,
  });
}
