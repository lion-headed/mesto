function showInputError(formElement, inputElement, errorMessage, classes) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classes.errorClass);
}
  
function hideInputError(formElement, inputElement, classes) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(classes.inputErrorClass);
    errorElement.classList.remove(classes.errorClass);
    errorElement.textContent = "";
}
  
function checkInputValidity(formElement, inputElement, classes) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, classes);
    } else {
      hideInputError(formElement, inputElement, classes);
    }
}

function setEventListeners(formElement, classes) {
    const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
    const buttonElement = formElement.querySelector(
      classes.submitButtonSelector
)

toggleButtonState(inputList, buttonElement, classes);
  
inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, classes);
        toggleButtonState(inputList, buttonElement, classes);
      });
    });
}
  
function toggleButtonState(inputList, buttonElement, classes) {
    if (hasInvalidInput(inputList)) {
      inactiveButton(buttonElement, classes);
    } else {
      buttonElement.classList.remove(classes.inactiveButtonClass);
      buttonElement.disabled=false;
    }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const inactiveButton = (buttonElement, classes) => {
  buttonElement.classList.add(classes.inactiveButtonClass);
  buttonElement.disabled=true;
}
  
function enableValidation(classes) {
    const formList = Array.from(document.querySelectorAll(classes.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, classes);
    });
}