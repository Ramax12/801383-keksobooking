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
        type: types[window.utils.randomInt(0, types.length)],
        features: window.utils.randomArray(FEATURES, window.utils.randomInt(1, FEATURES.length)),
        checkin: CHECKINS[window.utils.randomInt(0, CHECKINS.length)],
        checkout: CHECKOUTS[window.utils.randomInt(0, CHECKOUTS.length)],
        photos: window.utils.randomArray(PHOTOS, window.utils.randomInt(1, PHOTOS.length)),
        price: window.utils.randomInt(1000, 1000000),
        rooms: window.utils.randomInt(1, 5),
        guests: window.utils.randomInt(1, 3),
        description: ''
      },
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      location: {
        x: window.utils.randomInt(300, 900),
        y: window.utils.randomInt(130, 630)
      }
    };
    mark.offer.address = mark.location.x + ', ' + mark.location.y;
    return mark;
  };
})();
