const myForm = document.getElementById("myForm");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const ge = document.getElementById("ge");
const sr = document.getElementById("sr");
const message = document.getElementById("message");
const info = document.getElementById("info");
const types = document.getElementById("q-types");
const qt1 = document.getElementById("qt1");
const qt2 = document.getElementById("qt2");
const infoL = document.getElementById("info-label");

// Add red star
document.querySelectorAll(".star").forEach(label => {
  const star = document.createElement("span");
  star.textContent = " *";
  star.style.color = "var(--Green-600-medium)";
  label.appendChild(star);
});

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Helper: Show error
  function showError(input, message) {
    const small = input.parentElement.querySelector(".error-msg");
    small.textContent = message;
    small.style.display = "block";
    input.classList.add("error");
    isValid = false;
  }

  // Helper: Clear error
  function clearError(input) {
    const small = input.parentElement.querySelector(".error-msg");
    small.textContent = "";
    small.style.display = "none";
    input.classList.remove("error");
  }

  // First Name
  if (firstName.value.trim() === "") {
    showError(firstName, "This field is required");
  } else {
    clearError(firstName);
  }

  // Last Name
  if (lastName.value.trim() === "") {
    showError(lastName, "This field is required");
  } else {
    clearError(lastName);
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    showError(email, "This field is required");
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");
  } else {
    clearError(email);
  }

  // Query Type (radio)
  if (!ge.checked && !sr.checked) {
    const small = types.parentElement.querySelector(".error-msg");
    small.textContent = "Please select a query type";
    small.style.display = "block";
    
    isValid = false;
  } else {
    const small = types.parentElement.querySelector(".error-msg");
    small.textContent = "";
    small.style.display = "none";
    
  }

  // Message
  if (message.value.trim() === "") {
    showError(message, "This field is required");
  } else {
    clearError(message);
  }

  // Consent Checkbox
  if (!info.checked) {
    const small = infoL.parentElement.querySelector(".error-msg");
    small.textContent = "To submit this form, please consent to being contacted";
    small.style.display = "block";
    isValid = false;
  } else {
    const small = infoL.parentElement.querySelector(".error-msg");
    small.textContent = "";
    small.style.display = "none";
  }

  // ✅ Success Message
  if (isValid) {
    const successPopup = document.getElementById("successPopup");
    successPopup.classList.add("show");
    setTimeout(() => {
      successPopup.classList.remove("show");
    }, 3000);

    myForm.reset();
    document.querySelectorAll(".error-msg").forEach(el => el.style.display = "none");
  }
});
