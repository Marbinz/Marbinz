// Находим все поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Находим элементы формы редактирования профиля
const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Находим элементы формы добавления карточки
const cardFormElement = document.querySelector('.popup__form[name="new-place"]');

// Универсальные функции для открытия и закрытия поп-апов
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Функция для создания карточки
function createCard(name, link) {
  const template = document.getElementById('card-template');
  const cardClone = template.content.cloneNode(true);

  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardLikeButton = cardClone.querySelector('.card__like-button');
  const cardDeleteButton = cardClone.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Обработчик для лайка
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('card__like-button_active');
  });

  // Обработчик для удаления карточки
  cardDeleteButton.addEventListener('click', () => {
    const cardElement = cardDeleteButton.closest('.card');
    cardElement.remove();
  });

  // Обработчик для открытия поп-апа с изображением
  cardImage.addEventListener('click', () => {
    imagePopup.querySelector('.popup__image').src = link;
    imagePopup.querySelector('.popup__image').alt = name;
    imagePopup.querySelector('.popup__caption').textContent = name;
    openModal(imagePopup);
  });

  return cardClone;
}

// Функция для заполнения полей формы редактирования профиля
function fillProfileForm() {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(profilePopup);
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  document.querySelector('.profile__title').textContent = newName;
  document.querySelector('.profile__description').textContent = newJob;

  closeModal(profilePopup);
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardFormElement.querySelector('.popup__input_type_card-name').value;
  const cardLink = cardFormElement.querySelector('.popup__input_type_url').value;

  const newCard = createCard(cardName, cardLink);
  document.querySelector('.places__list').prepend(newCard);

  closeModal(cardPopup);
}

// Открытие и закрытие поп-апов
document.querySelector('.profile__edit-button').addEventListener('click', fillProfileForm);
document.querySelector('.profile__add-button').addEventListener('click', () => {
  cardFormElement.reset();
  openModal(cardPopup);
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(profilePopup);
});

cardPopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(cardPopup);
});

imagePopup.querySelector('.popup__close').addEventListener('click', () => {
  closeModal(imagePopup);
});

// Прикрепляем обработчики к формам
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);
