// Unit Tests

function runTests() {
  firstNameTest();
  emailTest();
}

function runner({ inputs, expectedOutputs, func }) {
  let results = '';
  for (let i = 0; i < inputs.length; i++) {
    let result = '';
    try {
      func(inputs[i]);
      result = `${func.name}(${inputs[i]}) passes`;
      if (!expectedOutputs[i]) {
        result = `<span style="color: red">${result}</span>`;
      }
    } catch (err) {
      result = `${func.name}(${inputs[i]}) fails with message: ${err.message}`;
      if (expectedOutputs[i]) {
        result = `<span style="color: red">${result}</span>`;
      }
    }
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
    func: validateName,
  });

  runner({
    inputs: invalidInputs,
    expectedOutputs: invalidInputs.map((_) => false),
    func: validateName,
  });
}

function emailTest() {
  const invalidEmails = ['@asdf.com', 'what@what', '', '..'];
  const validEmails = ['asdf@asdf.com', 'what@what.au', 'a@a.c'];

  runner({
    inputs: validEmails,
    expectedOutputs: validEmails.map((_) => true),
    func: validateEmail,
  });

  runner({
    inputs: invalidEmails,
    expectedOutputs: invalidEmails.map((_) => false),
    func: validateEmail,
  });
}

runTests();
