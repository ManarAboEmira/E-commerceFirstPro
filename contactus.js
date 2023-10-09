const vn = document.querySelector("#_name");
const vm = document.querySelector("#_mail");
const vp = document.querySelector("#_phone");
const vpass = document.querySelector("#_pass");
const vcpass = document.querySelector("#_c_pass");

const v_name = /^[a-zA-Z]+$/;
const v_mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const v_phone = /^[0-9]+$/;

const inputElements = [vn, vm, vp, vpass, vcpass];

inputElements.forEach((input) => {
  input.addEventListener("blur", () => {
    validateInput(input);
  });
});

document.querySelector("form").addEventListener("submit", (e) => {
  inputElements.forEach((input) => {
    validateInput(input);
  });
  if (inputElements.some((input) => !input.value.trim())) {
    e.preventDefault(); // Prevent form submission if any field is empty
  }
});

function validateInput(input) {
  const value = input.value.trim();
  const label = input.getAttribute("data-label");

  if (!value) {
    showError(`${label} is required`);
  } else {
    if (input === vn) {
      validateName(value);
    } else if (input === vm) {
      validateMail(value);
    } else if (input === vp) {
      validatePhone(value);
    } else if (input === vpass) {
      validatePassword(value);
    } else if (input === vcpass) {
      validateConfirmPassword(value);
    }
  }
}

function showError(message) {
  alert(message);
}

function validateName(name) {
  if (!v_name.test(name)) {
    showError("Name can only contain letters from A to Z");
  } else if (name.length < 4) {
    showError("Your Name must be at least 4 characters");
  } else if (name.length > 16) {
    showError("Your Name must be less than 16 characters");
  }
}

function validateMail(email) {
  if (!v_mail.test(email)) {
    showError("Your Mail must be in the correct email format");
  }
}

function validatePhone(phone) {
  if (!v_phone.test(phone) || !phone.startsWith("01")) {
    showError("Please enter a valid Phone Number starting with '01'");
  }
}

function validatePassword(password) {
  if (!password) {
    showError("Password is required");
  }
}

function validateConfirmPassword(confirmPassword) {
  const password = vpass.value.trim();
  if (!confirmPassword) {
    showError("Password is required");
  } else if (confirmPassword !== password) {
    showError("Passwords do not match. Please re-enter your password.");
  }
}
