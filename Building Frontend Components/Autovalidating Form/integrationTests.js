function TestBugIntegration() {
  let longName = '';
  for (let i = 0; i < 3000; i++) {
    longName += 'blah';
  }

  const firstNameInput = document.getElementsByClassName(
    'form__input--firstName'
  )[0];
  firstNameInput.value = longName;

  httpRequest({
    url: '/saveForm',
    data: serialize(),
  });

  const serializedForm = httpRequest({
    url: '/getForm',
  });
  const form = deserialize(serializedForm);

  // This will fail!
  assert(form.firstName === longName);
}
