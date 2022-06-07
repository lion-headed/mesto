const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#edit_traveler');
let jobInput = formElement.querySelector('#edit_vocation');
let profileTraveler = document.querySelector('.profile__traveler');
let profileVocation = document.querySelector('.profile__vocation');
const formOpener = document.querySelector('.profile__edit');
const content = document.querySelector('.popup');

function popupOpened() {
    content.classList.add('popup_opened');
    nameInput.value = profileTraveler.textContent;
    jobInput = profileVocation.textContent;
}
formOpener.addEventListener('click', popupOpened);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTraveler.textContent = nameInput.value;
    profileVocation.textContent = jobInput.value;
    popupClosed();
}

formElement.addEventListener('submit', formSubmitHandler);

const formCloser = document.querySelector('.popup__closebutton');

function popupClosed() {
    content.classList.remove('popup_opened');
}

formCloser.addEventListener('click', popupClosed);