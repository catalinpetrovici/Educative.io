class Guide {
  constructor({ className, getGuidanceMessage }) {
    this.htmlNode = document.getElementsByClassName(className)[0];
    this.getGuidanceMessage = getGuidanceMessage;
  }

  hide() {
    this.htmlNode.style.display = 'none';
  }

  show() {
    this.htmlNode.style.display = 'block';
  }

  update(val) {
    this.htmlNode.innerHTML = this.getGuidanceMessage(val);
  }
}

const PasswordCategories = {
  GOOD: 'password_good',
  FAIR: 'password_fair',
  WEAK: 'password_weak',
};

function getPasswordCategory(password) {
  const hasLettersRegex = /[a-zA-Z]+/;
  const hasNumbersRegex = /[0-9]+/;
  const hasOnlyLettersAndNumbersRegex = /^[a-zA-Z0-9]{6,}$/;

  function isGoodPassword() {
    return (
      hasLettersRegex.test(password) &&
      hasNumbersRegex.test(password) &&
      hasOnlyLettersAndNumbersRegex.test(password)
    );
  }

  function isFairPassword() {
    return hasOnlyLettersAndNumbersRegex.test(password);
  }

  if (isGoodPassword()) {
    return PasswordCategories.GOOD;
  }
  if (isFairPassword()) {
    return PasswordCategories.FAIR;
  }
  return PasswordCategories.WEAK;
}

const passwordGuide = new Guide({
  className: 'signup__field__guide--password',
  getGuidanceMessage: (val) => {
    switch (getPasswordCategory(val)) {
      case PasswordCategories.GOOD:
        return 'This password works!';
      case PasswordCategories.FAIR:
        return 'A good password uses a mix of numbers and letters.';
      case PasswordCategories.WEAK:
        return 'Try a longer password.';
    }
    return '';
  },
});

const guideMapping = {
  password: passwordGuide,
};

function showGuide(inputElement) {
  const field = inputElement.dataset.field;
  const guide = guideMapping[field];
  if (!guide) {
    return;
  }
  guide.show();
}

function hideGuide(inputElement) {
  const field = inputElement.dataset.field;
  const guide = guideMapping[field];
  if (!guide) {
    return;
  }
  guide.hide();
}

function updateGuide(inputElement) {
  const field = inputElement.dataset.field;
  const guide = guideMapping[field];
  if (!guide) {
    return;
  }
  guide.update(inputElement.value);
}
