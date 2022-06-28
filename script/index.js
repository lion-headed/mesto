const formElement = document.querySelector(".popup__form");
let popupInfo = document.querySelector(".popup");
let editInfoButton = document.querySelector(".profile__edit");
let closeInfoButton = document.querySelector(".popup__closebutton");
let profileTraveler = document.querySelector(".profile__traveler");
let profileVocation = document.querySelector(".profile__vocation");
let profileTravelerInput = document.querySelector(".popup__input_type_traveler");
let profileVocationInput = document.querySelector(".popup__input_type_vocation");
let addPlaceButton = document.querySelector(".profile__add");
let popupAdd = document.querySelector(".popup_add");
let popupAddForm = document.querySelector(".popup__addform");
let elementsList = document.querySelector(".elements__list");
let elementsTemplate = document.querySelector(".elements_template").content;
let closePlaceButton = document.querySelector(".popup__closebutton_popup_add");
let placeNameInput = document.querySelector(".popup__input_type_place-name");
let placeLinkInput = document.querySelector(".popup__input_type_place-link");
let popupPlaceImage = document.querySelector(".popup_open");
let popupPlaceImageLink = document.querySelector(".popup__placeimage");
let popupPlaceImageName = document.querySelector(".popup__openname");
let closeButtonPicture = document.querySelector(".popup__closebutton_popup_open");

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

function openPopup(popup) {
    popupInfo.classList.add("popup_opened");
}

function closePopup(popup) {
    popupInfo.classList.remove("popup_opened");
}

function openPopup(popupAdd) {
    popupAdd.classList.add("popup_opened");
}

function closePopup(popupAdd) {
    popupAdd.classList.remove("popup_opened");
}

function openPopup(popupPlaceImage) {
    popupPlaceImage.classList.add("popup_opened");
}

function closePopup(popupPlaceImage) {
    popupPlaceImage.classList.remove("popup_opened");
}

function editPopupInfo() {
    openPopup(popupInfo);
    profileTravelerInput.value = profileTraveler.textContent;
    profileVocationInput.value = profileVocation.textContent;
}

function submitFormHandlerInfo(evt) {
    evt.preventDefault();
    profileTraveler.textContent = profileTravelerInput.value;
    profileVocation.textContent = profileVocationInput.value;
    closePopup(popupInfo);
}

function toggleLikeButton(event) {
    event.target.classList.toggle("elements__like_active");
}

function deleteItem(event) {
    event.target.closest(".elements__element").remove();
}

function renderItem(name, link) {
    const newElement = createCard(name, link);
    elementsList.prepend(newElement);
}

function createItem(e) {
    e.preventDefault();
    renderItem(placeNameInput.value, placeLinkInput.value);
    e.target.reset();
    closePopup(popupAdd);
}

function openPicture(link, title) {
    openPopup(popupPlaceImage);
    popupPlaceImageLink.src = link;
    popupPlaceImageLink.alt = title;
    popupPlaceImageName.innerText = title;
}
function createCard(name, link) {
    const cardElement = elementsTemplate.cloneNode(true);
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

editInfoButton.addEventListener("click", function () {
    editPopupInfo();
});
closeInfoButton.addEventListener("click", function () {
    closePopup(popupInfo);
});
popupInfo.addEventListener("submit", function (event) {
    submitFormHandlerInfo(event);
});
  

addPlaceButton.addEventListener("click", () => openPopup(popupAdd));
closePlaceButton.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", createItem);
  
initialCards.forEach((item) => {
    renderItem(item.name, item.link);
});

closeButtonPicture.addEventListener("click", () => closePopup(popupPlaceImage));