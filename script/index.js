const editInfoButton = document.querySelector(".profile__edit");
const closeInfoButton = document.querySelector(".popup__closebutton_profile-popup");
const popupInfo = document.querySelector(".profile-popup");
const userName = document.querySelector(".profile__traveler");
const userJob = document.querySelector(".profile__vocation");
const popupInfoForm = document.querySelector(".popup__form");
const userNameInput = document.querySelector(".popup__input_type_traveler");
const userJobInput = document.querySelector(".popup__input_type_vocation");
 
const addPlaceButton = document.querySelector(".profile__add");
const closePlaceButton = document.querySelector(".popup__closebutton_popup_add");
const popupAdd = document.querySelector(".popup_add");
const itemTemplate = document.querySelector(".elements_template").content;
const elList = document.querySelector(".elements__list");
const popupAddForm = document.querySelector(".popup__form");
const placeTitleInput = document.querySelector(".popup__input_type_placename");
const placeLinkInput = document.querySelector(".popup__input_type_placelink");
 
const popupPicture = document.querySelector(".popup_open");
const popupPictureLink = document.querySelector(".popup__placeimage");
const popupPictureTitle = document.querySelector(".popup__openname");
const closeButtonPicture = document.querySelector(".popup__closebutton_popup_open");
 
const buttonElementInfo = popupInfoForm.querySelector(".popup__savebutton");
const buttonElementPlace = popupAddForm.querySelector(".popup__savebutton");
 
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
 
function closePopupByEsc(evt) {
   if (evt.key === "Escape") {
     closePopup(document.querySelector(".popup_opened"));
   }
}
 
function closePopupByClick(evt) {
   if (evt.target.classList.contains("popup_opened")) {
     closePopup(document.querySelector(".popup_opened"));
   }
}
 
function openPopup(popup) {
   popup.classList.add("popup_opened");
   document.addEventListener("keydown", closePopupByEsc);
   popup.addEventListener("click", closePopupByClick);
}
 
function closePopup(popup) {
   popup.classList.remove("popup_opened");
   document.removeEventListener("keydown", closePopupByEsc);
   popup.removeEventListener("click", closePopupByClick);
}
 
function editPopupInfo() {
   openPopup(popupInfo);
   userNameInput.value = userName.textContent;
   userJobInput.value = userJob.textContent;
   toggleButtonState([userNameInput, userJobInput], buttonElementInfo, classes);
}
 function submitFormHandlerInfo(evt) {
   evt.preventDefault();
   userName.textContent = userNameInput.value;
   userJob.textContent = userJobInput.value;
   closePopup(popupInfo);
}
 function toggleLikeButton(event) {
   event.target.classList.toggle("elements__like_active");
}
 function deleteItem(event) {
   event.target.closest(".elements__element").remove();
}
 
function openPicture(link, title) {
   openPopup(popupPicture);
   popupPictureLink.src = link;
   popupPictureLink.alt = title;
   popupPictureTitle.innerText = title;
}
 function createCard(name, link) {
   const cardElement = itemTemplate.cloneNode(true);
   cardElement.querySelector(".elements__title").innerText = name;
   const elImage = cardElement.querySelector(".elements__image");
   elImage.src = link;
   elImage.alt = name;
   cardElement
     .querySelector(".elements__like")
     .addEventListener("click", toggleLikeButton);
   cardElement
     .querySelector(".elements__delete")
     .addEventListener("click", deleteItem);
   elImage.addEventListener("click", function () {
     openPicture(link, name);
   });
   return cardElement;
}
 function renderItem(name, link) {
   const newElement = createCard(name, link);
   elList.prepend(newElement);
}
 function createItem(e) {
   e.preventDefault();
   renderItem(placeTitleInput.value, placeLinkInput.value);
   e.target.reset();
   toggleButtonState(placeTitleInput, placeLinkInput, buttonElementPlace, classes);
   closePopup(popupAdd);
}
 enableValidation(classes);
 
editInfoButton.addEventListener("click", function () {
   editPopupInfo();
});
 
closeInfoButton.addEventListener("click", function () {
   closePopup(popupInfo);
});
 
popupInfoForm.addEventListener("submit", function (event) {
   submitFormHandlerInfo(event);
});
 
addPlaceButton.addEventListener("click", () => openPopup(popupAdd));
closePlaceButton.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", createItem);
 initialCards.forEach((item) => {
   renderItem(item.name, item.link);
});
 
closeButtonPicture.addEventListener("click", () => closePopup(popupPicture));