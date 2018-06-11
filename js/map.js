'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarMarkElement = map.querySelector('.map__pins');
var similarMarkTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');
var similarCardElement = map.querySelector('.map__cards');
var similarCardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');

function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
}

var avatar = function (numberImg) {
  numberImg += 1;

  return 'img/avatars/user' + '0' + numberImg + '.png';
};
var offer = {
  heading: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  address: [600, 350],
  price: getRandomInt(1000, 1000000),
  rooms: getRandomInt(1, 5),
  guests: getRandomInt(1, 100),
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: '',
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var type = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var renderMark = function () {
  var markElement = similarMarkTemplate.cloneNode(true);

  markElement.style.left = getRandomInt(300, 900) + 'px';
  markElement.style.top = getRandomInt(130, 630) + 'px';
  markElement.querySelector('.map__pin img').src = avatar(i);
  markElement.querySelector('.map__pin img').alt = offer.heading[i];

  return markElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < offer.heading.length; i++) {
  fragment.appendChild(renderMark());
}
similarMarkElement.appendChild(fragment);

var renderCard = function () {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.heading[1];
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = type.flat;
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin[1] + ', выезд до ' + offer.checkout[1];
  cardElement.querySelector('.popup__features').textContent = offer.features;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photo').src = offer.photos[1];
  cardElement.querySelector('.popup__avatar').src = avatar(0);

  return cardElement;
};
similarCardElement.appendChild(renderCard());
