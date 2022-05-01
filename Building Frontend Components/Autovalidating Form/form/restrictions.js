function isNumberRestricted({ event, maxNum }) {
  const specialKeys = ['Enter', 'Backspace'];
  if (specialKeys.includes(event.key)) {
    return false;
  }
  const proposedInput = event.target.value + event.key;
  if (proposedInput.length > maxNum) {
    return true;
  }
  const numberRegex = /^[0-9]+$/;
  if (!numberRegex.test(proposedInput)) {
    return true;
  }
  return false;
}

function isYearInputRestricted(event) {
  return isNumberRestricted({ event, maxNum: 4 });
}

function isDayInputRestricted(event) {
  return isNumberRestricted({ event, maxNum: 2 });
}

const restrictionsMapping = {
  year: isYearInputRestricted,
  day: isDayInputRestricted,
};

function restrict(event) {
  const field = event.target.dataset.field;
  const restriction = restrictionsMapping[field];
  if (!restriction) {
    return;
  }
  const isRestricted = restriction(event);
  if (isRestricted) {
    event.preventDefault();
  }
}

const inputs = document.getElementsByClassName('signup__field__inputs__input');
for (const input of inputs) {
  input.onblur = (event) => {
    validate(event.target);
    hideGuide(event.target);
  };
  input.onfocus = (event) => showGuide(event.target);
  input.onkeyup = (event) => updateGuide(event.target);
  input.onkeydown = restrict;
}

const monthSelectorTemplate = `
    <ul class='signup__selector__list'>
      <li data-month='1' data-field='month-selection' class='signup__selector__list__item'>January</li> 
      <li data-month='2' data-field='month-selection' class='signup__selector__list__item'>February</li> 
      <li data-month='3' data-field='month-selection' class='signup__selector__list__item'>March</li> 
      <li data-month='4' data-field='month-selection' class='signup__selector__list__item'>April</li> 
      <li data-month='5' data-field='month-selection' class='signup__selector__list__item'>May</li> 
      <li data-month='6' data-field='month-selection' class='signup__selector__list__item'>June</li> 
      <li data-month='7' data-field='month-selection' class='signup__selector__list__item'>July</li> 
      <li data-month='8' data-field='month-selection' class='signup__selector__list__item'>August</li> 
      <li data-month='9' data-field='month-selection' class='signup__selector__list__item'>September</li> 
      <li data-month='10' data-field='month-selection' class='signup__selector__list__item'>October</li> 
      <li data-month='11' data-field='month-selection' class='signup__selector__list__item'>November</li> 
      <li data-month='12' data-field='month-selection' class='signup__selector__list__item'>December</li> 
    </ul>
  `;

function setMonth(event) {
  const month = event.target.dataset.month;
  const hiddenMonthInput = document.getElementsByClassName(
    'signup__field__inputs__input--birth-month'
  )[0];
  hiddenMonthInput.value = month;
  const visibleMonthInput = document.getElementsByClassName(
    'signup__field__inputs__selection--month'
  )[0];
  visibleMonthInput.innerHTML = event.target.innerHTML;
  hideMonthSelection();
}

function showMonthSelection(event) {
  const element = event.target;
  const x = element.offsetLeft;
  const y = element.offsetTop;
  const monthSelector = document.createElement('div');
  monthSelector.dataset.field = 'month-selector';
  monthSelector.classList.add('signup__selector');
  monthSelector.innerHTML = monthSelectorTemplate;
  monthSelector.style.left = `${x}px`;
  monthSelector.style.top = `${y}px`;
  document.body.appendChild(monthSelector);

  for (const monthItem of monthSelector.children[0].children) {
    monthItem.onclick = setMonth;
  }
}

function hideMonthSelection() {
  const monthSelector = document.getElementsByClassName('signup__selector')[0];
  if (!monthSelector) {
    return;
  }
  for (const monthItem of monthSelector.children[0].children) {
    monthItem.removeEventListener('click', setMonth);
  }
  document.body.removeChild(monthSelector);
}

function onAnywhereClick(event) {
  const field =
    event.target && event.target.dataset && event.target.dataset.field;
  if (field !== 'month' && field !== 'month-selection') {
    hideMonthSelection();
  }
}

const monthSelectElement = document.getElementsByClassName(
  'signup__field__inputs__selection--month'
)[0];
monthSelectElement.onclick = showMonthSelection;

document.body.onclick = onAnywhereClick;
