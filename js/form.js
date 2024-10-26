const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const messageInput = document.querySelector("#message");
const submitBtn = document.querySelector("#submit");
const allInputs = document.querySelectorAll(".form--input");

// Patterns to validate the form
const namePattern = /^[a-zA-Z\s'-]+$/;
const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonePattern = /^\(\s\d{3}\s\)\s\d{3}\s-\s\d{4}$/;

// Arrow function to handle the error on the inputs
const addError = (input, label) => {
  input.classList.add("error");
  label.classList.add("error--message");
};

const removeError = (input, label) => {
  input.classList.remove("error");
  label.classList.remove("error--message");
};

//  Arrow function to handle the format of the phone in the input
const handlePhoneFormat = (input) => {
  // This line force the input to only have numbers
  inputValue = input.value.replace(/\D/g, "");

  // Add the characters of the phone in the specific points of the input
  if (inputValue.length > 0) {
    inputValue = `( ${inputValue}`;
  }

  if (inputValue.length > 4) {
    inputValue = inputValue.slice(0, 5) + " ) " + inputValue.slice(5);
  }

  if (inputValue.length > 10) {
    inputValue = inputValue.slice(0, 11) + " - " + inputValue.slice(11);
  }

  //   Add the value to input and also set a limit of how long the number needs to be
  input.value = inputValue;
  input.value = input.value.slice(0, 18);
};

// Iterating on the inputs to add the events listeners
allInputs.forEach((input) => {
  // Getting the labels from the inputs.
  const labelElement = input.parentElement.childNodes[1];

  //   Event listener to check the input every time the user type on any input
  input.addEventListener("input", () => {
    checkInput(input, labelElement);
  });
});

//  Event listener that delete all the value in the phone input
phoneInput.addEventListener("keydown", (event) => {
  event.key === "Backspace" ? (phoneInput.value = "") : "";
});

// Function to check if the inputs have the right pattern
function checkInput(input, label) {
  switch (input.id) {
    case "name":
      if (namePattern.test(input.value)) {
        removeError(input, label);
        handleSubmit();
      } else {
        addError(input, label);
        handleSubmit();
      }
      break;
    case "email":
      if (emailPattern.test(input.value)) {
        removeError(input, label);
        handleSubmit();
      } else {
        addError(input, label);
        handleSubmit();
      }
      break;
    case "phone":
      handlePhoneFormat(input);
      if (phonePattern.test(input.value)) {
        removeError(input, label);
        handleSubmit();
      } else {
        addError(input, label);
        handleSubmit();
      }
      break;
    case "message":
      if (input.value.length > 10) {
        removeError(input, label);
        handleSubmit();
      } else {
        addError(input, label);
        handleSubmit();
      }
      break;
  }
}

// Function that handle the submit button. Tells when the button has to be available and when has to be disabled
function handleSubmit() {
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === "" ||
    messageInput.value.length <= 10
  ) {
    submitBtn.classList.add("disabled");
    return;
  }

  submitBtn.classList.remove("disabled");
}
