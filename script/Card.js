class Card {
    constructor(data, cardTemplateSelector, openPopup, popupPlaceImage, popupPlaceImageLink, popupPlaceImageName) {
      this._name = data.name;
      this._link = data.link;
      this._cardTemplateSelector = cardTemplateSelector;
      this._openPopup = openPopup;
      this._popupPlaceImage = popupPlaceImage;
      this._popupPlaceImageLink = popupPlaceImageLink;
      this._popupPlaceImageName = popupPlaceImageName;
    }
    
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardTemplateSelector)
        .content.querySelector(".elements__element")
        .cloneNode(true);
      return cardElement;
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector(".elements__image");
      this._setEventListeners();
      this._title = this._element.querySelector(".elements__title");
      this._title.innerText = this._name;
      this._image.src = this._link;
      this._image.alt = this._name;
      return this._element;
    }
  
    _deleteItem() {
      this._delete.closest(".elements__element").remove();
    }
  
    _openPicture() {
      this._openPopup(this._popupPlaceImage);
      this._popupPlaceImageLink.src = this._link;
      this._popupPlaceImageLink.alt = this._name;
      this._popupPlaceImageName.innerText = this._name;
    }
  
    _setEventListeners() {
      this._like = this._element.querySelector(".elements__like");
      this._delete = this._element.querySelector(".elements__delete");
      this._like.addEventListener("click", () => {
        this._toggleLikeButton();
      });
      this._delete.addEventListener("click", () => {
        this._deleteItem();
      });
      this._image.addEventListener("click", () => {this._openPicture()});
    }

    _toggleLikeButton(event) {
        this._like.classList.toggle("elements__like_active");
    }
  
    _toggleLikeButton(event) {
        this.event.target.classList.toggle("elements__like_active");
    }
}

export {Card};