// Instead of having a set of inputs map to a set of expected outputs, acceptance tests typically look at the state of the world after a set of actions have been taken.

function TestPasswordGuide() {
  const passwordInput = document.getElementsByClassName(
    'form__input--password'
  )[0];
  passwordInput.focus();

  const passwordGuideMessage = document.getElementsByClassName(
    'password__guide__message'
  )[0];

  const badPassword = 'foo';
  const goodPassword = badPassword + 'bar123';

  for (const character of badPassword) {
    const keypress = new Event('keydown');
    keypress.key = character;
    document.dispatchEvent(keypress);
  }

  assert(passwordGuideMessage.innerHTML === 'Bad');

  for (const character of goodPassword) {
    const keypress = new Event('keydown');
    keypress.key = character;
    document.dispatchEvent(keypress);
  }

  assert(passwordGuideMessage.innerHTML === 'Good');
}
