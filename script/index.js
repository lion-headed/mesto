import {initialCards} from "./Cards.js"
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
const elementsTemplate = document.querySelector(".elements_template");
const placeNameInput = document.querySelector(".popup__input_type_placename");
const placeLinkInput = document.querySelector(".popup__input_type_placelink");
const popupPlaceImage = document.querySelector(".popup_open");
const popupPlaceImageLink = document.querySelector(".popup__placeimage");
const popupPlaceImageName = document.querySelector(".popup__openname");
const placeCloseButton = document.querySelector(".popup__closebutton_popup_open");
const elementProfileSavebutton = profileForm.querySelector(".popup__savebutton");
const elementPlaceSavebutton = popupAddForm.querySelector(".popup__savebutton");

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
   openPopup(profilePopup);
}
 function submitFormHandlerInfo(evt) {
   evt.preventDefault();
   profileTraveler.textContent = profileTravelerInput.value;
   profileVocation.textContent = profileVocationInput.value;
   closePopup(profilePopup);
}

function openPlaceImage(link, title) {
  popupPictureLink.src = link;
  popupPictureLink.alt = title;
  popupPictureTitle.innerText = title;
  openPopup(popupPicture);
}

function createItem(cardData) {
  const card = new Card(cardData, ".elements_template", openPlaceImage);
  const cardElement = card.createCard();

  document.querySelector(".elements__list").prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;
  createItem(newCard);
  evt.target.reset();
  formAddCardValidator.deactivateButtonState();
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
popupAddForm.addEventListener("submit", handleAddCardFormSubmit);
 
placeCloseButton.addEventListener("click", () => closePopup(popupPlaceImage));

initialCards.forEach((cardData) => {
  createItem(cardData);
});