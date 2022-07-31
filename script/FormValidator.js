class FormValidator {
  constructor(formElement, classes) {
    this._formElement = formElement;
    this._classes = classes;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._classes.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._classes.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classes.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._classes.inputErrorClass);
    errorElement.classList.remove(this._classes.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._classes.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._classes.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  activateButtonSate() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(this._classes.inactiveButtonClass);
  }

  deactivateButtonState() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._classes.inactiveButtonClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export {FormValidator};