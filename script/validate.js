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
  
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}
  
function toggleButtonState(inputList, buttonElement, classes) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(classes.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(classes.inactiveButtonClass);
    }
}
  
function enableValidation(classes) {
    const formList = Array.from(document.querySelectorAll(classes.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, classes);
    });
}