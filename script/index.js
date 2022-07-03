const profileForm = document.querySelector(".popup__form");
const profilePopup = document.querySelector(".profile-popup");
const editInfoButton = document.querySelector(".profile__edit");
const closeInfoButton = document.querySelector(".popup__closebutton");
const profileTraveler = document.querySelector(".profile__traveler");
const profileVocation = document.querySelector(".profile__vocation");
const profileTravelerInput = document.querySelector(".popup__input_type_traveler");
const profileVocationInput = document.querySelector(".popup__input_type_vocation");
const addPlaceButton = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = document.querySelector(".popup__addform");
const elementsList = document.querySelector(".elements__list");
const elementsTemplate = document.querySelector(".elements_template").content;
const closePlaceButton = document.querySelector(".popup__closebutton_popup_add");
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeLinkInput = document.querySelector(".popup__input_type_place-link");
const popupPlaceImage = document.querySelector(".popup_open");
const popupPlaceImageLink = document.querySelector(".popup__placeimage");
const popupPlaceImageName = document.querySelector(".popup__openname");
const closeButtonPicture = document.querySelector(".popup__closebutton_popup_open");

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
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function editprofilePopup() {
    openPopup(profilePopup);
    profileTravelerInput.value = profileTraveler.textContent;
    profileVocationInput.value = profileVocation.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTraveler.textContent = profileTravelerInput.value;
    profileVocation.textContent = profileVocationInput.value;
    closePopup(profilePopup);
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
    editprofilePopup();
});
closeInfoButton.addEventListener("click", function () {
    closePopup(profilePopup);
});
profilePopup.addEventListener("submit", function (event) {
    handleProfileFormSubmit(event);
});
  

addPlaceButton.addEventListener("click", () => openPopup(popupAdd));
closePlaceButton.addEventListener("click", () => closePopup(popupAdd));
popupAddForm.addEventListener("submit", createItem);

closeButtonPicture.addEventListener("click", () => closePopup(popupPlaceImage));

initialCards.forEach((item) => {
    renderItem(item.name, item.link);
});