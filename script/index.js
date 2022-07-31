import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const profileForm = document.querySelector(".popup__form_profile");
const profilePopup = document.querySelector(".profile-popup");
const profileButton = document.querySelector(".profile__edit");
const profileEditCloseButton = document.querySelector(".popup__closebutton_profile-popup");
const profileTraveler = document.querySelector(".profile__traveler");
const profileVocation = document.querySelector(".profile__vocation");
const profileTravelerInput = document.querySelector(".popup__input_type_traveler");
const profileVocationInput = document.querySelector(".popup__input_type_vocation");
const newPlaceButton = document.querySelector(".profile__add");
const newPlaceButtonClose = document.querySelector(".popup__closebutton_popup_add");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = document.querySelector(".popup__form_add");
const cardsContainer = document.querySelector(".elements__list");
const elementsTemplate = document.querySelector(".elements_template").content;
const placeNameInput = document.querySelector(".popup__input_type_placename");
const placeLinkInput = document.querySelector(".popup__input_type_placelink");
const popupPlaceImage = document.querySelector(".popup_open");
const popupPlaceImageLink = document.querySelector(".popup__placeimage");
const popupPlaceImageName = document.querySelector(".popup__openname");
const placeCloseButton = document.querySelector(".popup__closebutton_popup_open");
const elementProfileSavebutton = profileForm.querySelector(".popup__savebutton");
const elementPlaceSavebutton = popupAddForm.querySelector(".popup__savebutton");
 
const initialCards = [
   {
     name: "Архыз",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
   },
   {
     name: "Челябинская область",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
   },
   {
     name: "Иваново",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
   },
   {
     name: "Камчатка",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
   },
   {
     name: "Холмогорский район",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
   },
   {
     name: "Байкал",
     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
   },
];
 const classes = {
   formSelector: ".popup__form",
   inputSelector: ".popup__input",
   submitButtonSelector: ".popup__savebutton",
   inactiveButtonClass: "popup__savebutton_inactive",
   inputErrorClass: "popup__input_type_error",
   errorClass: "popup__error_active",
};

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupEsc);
    popup.removeEventListener("mousedown", closePopupExternalClick);
 }

function closePopupEsc(evt) {
   if (evt.key === "Escape") {
     closePopup(document.querySelector(".popup_opened"));
   }
}
 
function closePopupExternalClick(evt) {
   if (evt.target.classList.contains("popup_opened")) {
     closePopup(evt.target);
   }
}
 
function openPopup(popup) {
   popup.classList.add("popup_opened");
   document.addEventListener("keydown", closePopupEsc);
   popup.addEventListener("mousedown", closePopupExternalClick);
}

const formAddCardValidator = new FormValidator(popupAdd, classes);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(profilePopup, classes);
formEditProfileValidator.enableValidation();
 
function editprofilePopup() {
   openPopup(profilePopup);
   profileTravelerInput.value = profileTraveler.textContent;
   profileVocationInput.value = profileVocation.textContent;
   toggleButtonState([profileTravelerInput, profileVocationInput], elementProfileSavebutton, classes);
}
 function submitFormHandlerInfo(evt) {
   evt.preventDefault();
   profileTraveler.textContent = profileTravelerInput.value;
   profileVocation.textContent = profileVocationInput.value;
   closePopup(profilePopup);
}

function createItem(evt) {
   evt.preventDefault();
   const newCard = {};
   newCard.name = placeNameInput.value;
   newCard.link = placeLinkInput.value;
   const card = new Card(
     newCard,
     ".elements-template",
     openPopup,
     popupPlaceImage,
     popupPlaceImageLink,
     popupPlaceImageName
   );
   const cardElement = card.createCard();
   document.querySelector(".elements__list").prepend(cardElement);
   evt.target.reset();
   closePopup(popupAdd);
}

profileButton.addEventListener("click", function () {
   editprofilePopup();
});
 
profileEditCloseButton.addEventListener("click", function () {
   closePopup(profilePopup);
});
 
profileForm.addEventListener("submit", function (event) {
   submitFormHandlerInfo(event);
});
 
newPlaceButton.addEventListener("click", () => openPopup(popupAdd));
newPlaceButtonClose.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", createItem);
 
placeCloseButton.addEventListener("click", () => closePopup(popupPlaceImage));

initialCards.forEach((item) => {
   const card = new Card(
     item,
     ".elements_template",
     openPopup,
     popupPlaceImage,
     popupPlaceImageLink,
     popupPlaceImageName
   );
   const cardElement = card.createCard();
   document.querySelector(".elements__list").prepend(cardElement);
 });