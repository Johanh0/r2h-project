const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const messageInput = document.querySelector("#message");

const allInputs = document.querySelectorAll(".form--input");

// Patterns to validate the form
const namePattern = /^[a-zA-Z\s'-]+$/;
const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonePattern = /^\(\d{3}\) \d{3} - \d{3}$/;

// Arrow function to handle the error on the inputs
const addError = (input, label) => {
  input.classList.add("error");
  label.classList.add("error--message");
};

const removeError = (input, label) => {
  input.classList.remove("error");
  label.classList.remove("error--message");
};

const handlePhoneFormat = (input) => {
  inputValue = input.value.replace(/\D/g, "");
  //   console.log(input.value.replace(/\D/g, ""));
  if (inputValue.length > 0) {
    inputValue = `( ${inputValue}`;
  }

  if (inputValue.length > 4) {
    inputValue = inputValue.slice(0, 5) + " ) " + inputValue.slice(5);
  }

  if (inputValue.length > 7) {
    inputValue = inputValue.slice(0, 11) + " - " + inputValue.slice(11);
  }

  input.value = inputValue;
  input.value = input.value.slice(0, 17);
};

// Iterating on the inputs to add the events listeners
allInputs.forEach((input) => {
  const labelElement = input.parentElement.childNodes[1];

  input.addEventListener("input", () => {
    checkInput(input, labelElement);
  });

  //   input.addEventListener("blur", () => {
  //     checkInput(input, labelElement);
  //   });
});

// Function to check if the inputs have the right pattern
function checkInput(input, label) {
  switch (input.id) {
    case "name":
      if (namePattern.test(input.value)) {
        removeError(input, label);
      } else {
        addError(input, label);
      }
      break;
    case "email":
      if (emailPattern.test(input.value)) {
        removeError(input, label);
      } else {
        addError(input, label);
      }
      break;
    case "phone":
      handlePhoneFormat(input);
      if (phonePattern.test(input.value)) {
        removeError(input, label);
      } else {
        addError(input, label);
      }
      break;
    case "message":
      if (input.value.length > 10) {
        removeError(input, label);
      } else {
        addError(input, label);
      }
      break;
  }
}
