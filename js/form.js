'use strict';

(function () {
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
  var mapPinAddress = document.querySelector('#address');

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

  window.onError = function (textError) {
    error.style.display = 'block';
    error.textContent = textError;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var resetForm = function () {
    adForm.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinAddress.value = window.calculateAddress();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), resetForm, window.onError);
  });
})();
