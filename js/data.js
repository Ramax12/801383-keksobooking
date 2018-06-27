'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  window.TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.createMark = function (i) {
    var types = Object.keys(window.TYPES);
    var mark = {
      offer: {
        title: TITLES[i],
        type: types[window.randomValue.getRandomInt(0, types.length)],
        features: window.randomValue.randomArray(FEATURES, window.randomValue.getRandomInt(1, FEATURES.length)),
        checkin: CHECKINS[window.randomValue.getRandomInt(0, CHECKINS.length)],
        checkout: CHECKOUTS[window.randomValue.getRandomInt(0, CHECKOUTS.length)],
        photos: window.randomValue.randomArray(PHOTOS, window.randomValue.getRandomInt(1, PHOTOS.length)),
        price: window.randomValue.getRandomInt(1000, 1000000),
        rooms: window.randomValue.getRandomInt(1, 5),
        guests: window.randomValue.getRandomInt(1, 3),
        description: ''
      },
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      location: {
        x: window.randomValue.getRandomInt(300, 900),
        y: window.randomValue.getRandomInt(130, 630)
      }
    };
    mark.offer.address = mark.location.x + ', ' + mark.location.y;
    return mark;
  };
})();
