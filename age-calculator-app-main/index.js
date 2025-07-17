const errorD = document.getElementById('errorD');
const errorM = document.getElementById('errorM');
const errorY = document.getElementById('errorY');
const myBtn = document.getElementById('myBtn');

const today = new Date();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    myBtn.click();
  }
});

myBtn.addEventListener('click', () => {
  const day = document.getElementById('day');
  const month = document.getElementById('month');
  const year = document.getElementById('year');

  const inputs = document.querySelectorAll('.date-type input');
  let hasError = false;

  inputs.forEach(input => {
    const value = input.value.trim();
    const errorP = input.closest('.date-type').querySelector('p');

    if (value === '') {
      errorP.textContent = "This field is required";
      errorCss(input);
      hasError = true;
    } else {
      input.style.border = "1px solid var(--Grey-500)";
      input.parentElement.style.color = "var(--Grey-500)";
      errorP.textContent = '';
    }
  });

  const d = parseInt(day.value);
  const m = parseInt(month.value);
  const y = parseInt(year.value);

  if (d > 31) {
    errorD.textContent = "Must be a valid day";
    errorCss(day);
    hasError = true;
  }

  if (m > 12) {
    errorM.textContent = "Must be a valid month";
    errorCss(month);
    hasError = true;
  }

  if (y > today.getFullYear()) {
    errorY.textContent = "Must be in the past";
    errorCss(year);
    hasError = true;
  }
  
  const testDate = new Date(y, m - 1, d);
  if (
    testDate.getFullYear() !== y ||
    testDate.getMonth() !== m - 1 ||
    testDate.getDate() !== d
  ) {
    errorD.textContent = "Must be a valid date";
    errorCss(day);
    hasError = true;
  }

  if (!hasError) {
    calculateAge(day, month, year);
  }
});

function errorCss(x) {
  x.style.border = "1px solid var(--Red-400)";
  x.parentElement.style.color = "var(--Red-400)";
}

function calculateAge(dayInput, monthInput, yearInput) {
  const dayR = document.getElementById("dayR");
  const monthR = document.getElementById("monthR");
  const yearR = document.getElementById("yearR");

  const d = parseInt(dayInput.value);
  const m = parseInt(monthInput.value);
  const y = parseInt(yearInput.value);

  const birthDate = new Date(y, m - 1, d);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  dayR.textContent = days;
  monthR.textContent = months;
  yearR.textContent = years;
}
