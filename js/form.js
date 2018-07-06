'use strict';

(function () {
  var DEFAULT_MAP_PIN_X = 570;
  var DEFAULT_MAP_PIN_Y = 375;
  var MIN_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var ROOM_NUMBER_AND_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');
  var error = document.querySelector('.error');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var changeType = function () {
    var minValuePrice = MIN_PRICE[type.value];

    price.setAttribute('min', minValuePrice);
    price.setAttribute('placeholder', minValuePrice);
  };
  type.addEventListener('change', changeType);

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var validateGuests = function () {
    var capacityArray = ROOM_NUMBER_AND_CAPACITY[roomNumber.value];

    roomNumber.setCustomValidity('');
    roomNumber.checkValidity();
    if (capacityArray.indexOf(capacity.value) < 0) {
      roomNumber.setCustomValidity('Количество комнат не подходит для количества гостей');
    }
  };
  roomNumber.addEventListener('change', validateGuests);
  capacity.addEventListener('change', validateGuests);

  error.addEventListener('click', function () {
    error.style.display = 'none';
  });

  var onError = function (textError) {
    error.style.display = 'block';
    error.textContent = textError;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var resetForm = function () {
    var mapPins = map.querySelectorAll('.map__pin:not(:last-of-type)');
    var mapCard = document.querySelector('.map__card');

    adForm.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pinMain.style.left = DEFAULT_MAP_PIN_X + 'px';
    pinMain.style.top = DEFAULT_MAP_PIN_Y + 'px';
    window.pin.disablePage();
    if (mapCard) {
      window.card.closeCard();
    }
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].parentNode.removeChild(mapPins[i]);
    }
    window.pin.enablePage();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), resetForm, onError);
  });

  window.form = {
    onError: onError
  };
})();
