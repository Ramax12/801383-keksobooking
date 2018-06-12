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

// var avatar = function (numberImg) {

//   return 'img/avatars/user' + '0' + numberImg + '.png';
// };

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
// var offer = {
//   address: [600, 350],
//   price: getRandomInt(1000, 1000000),
//   rooms: getRandomInt(1, 5),
//   guests: getRandomInt(1, 100),

//    description: '',
//   };

var renderMark = function (mark) {
  var markElement = similarMarkTemplate.cloneNode(true);

  markElement.style.left = mark.location.x - 25 + 'px';
  markElement.style.top = mark.location.y - 70 + 'px';
  markElement.querySelector('.map__pin img').src = mark.author.avatar;
  markElement.querySelector('.map__pin img').alt = mark.offer.title;

  return markElement;
};

var randomArray = function(array, count) {
  array.sort(function() { return Math.random() - 0.5 });
  var items = [];
  for (var i = 0; i < count; i++) {
    var item = array[i];
    items.push(item);
  }
  return items;
};

var createMark = function (i) {
  var types = Object.keys(TYPES);
  var mark = {
    offer: {
      title: TITLES[i],
      type: types[getRandomInt(0, types.length)],
      features: randomArray(FEATURES, getRandomInt(0, FEATURES.length)),
      checkin: CHECKINS[getRandomInt(0, CHECKINS.length)],
      checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length)],
      photos: randomArray(PHOTOS, getRandomInt(0, PHOTOS.length)),
      price: getRandomInt(1000, 1000000),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 100),
      description: ''
    },
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(130, 630)
    }
  };
  mark.address = mark.location.x + ', ' + mark.location.y;
  return mark;
};

var marks = [];

var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  var mark = createMark(i);
  marks.push(mark);
  fragment.appendChild(renderMark(mark));
}
similarMarkElement.appendChild(fragment);

var photoElementTemplate = document.querySelector('template').content.querySelector('.popup__photo');
var renderPhotos = function (photos, container) {
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoElementTemplate.cloneNode();
    photoElement.src = photos[i];
    container.appendChild(photoElement);
  }
}
var renderCard = function (mark) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = mark.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mark.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mark.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[mark.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = mark.offer.rooms + ' комнаты для ' + mark.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mark.offer.checkin[1] + ', выезд до ' + mark.offer.checkout[1];
  cardElement.querySelector('.popup__features').textContent = mark.offer.features;
  cardElement.querySelector('.popup__description').textContent = mark.offer.description;
  renderPhotos(mark.offer.photos, cardElement.querySelector('.popup__photos'));
  cardElement.querySelector('.popup__avatar').src = mark.author.avatar;

  return cardElement;
};
document.querySelector('.map__filters-container').parentNode.insertBefore(renderCard(marks[0]), document.querySelector('.map__filters-container'));
