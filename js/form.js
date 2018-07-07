'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEFAULT_MAP_PIN_X = 570;
  var DEFAULT_MAP_PIN_Y = 375;
  var MinPrice = {
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

  var priceContainer = document.querySelector('#price');
  var typeContainer = document.querySelector('#type');
  var timeInContainer = document.querySelector('#timein');
  var timeOutContainer = document.querySelector('#timeout');
  var roomNumberContainer = document.querySelector('#room_number');
  var capacityContainer = document.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');
  var error = document.querySelector('.error');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var changeType = function () {
    var minValuePrice = MinPrice[typeContainer.value];

    priceContainer.setAttribute('min', minValuePrice);
    priceContainer.setAttribute('placeholder', minValuePrice);
  };
  typeContainer.addEventListener('change', changeType);

  timeInContainer.addEventListener('change', function () {
    timeOutContainer.value = timeInContainer.value;
  });

  timeOutContainer.addEventListener('change', function () {
    timeInContainer.value = timeOutContainer.value;
  });

  var validateGuests = function () {
    var capacityArray = ROOM_NUMBER_AND_CAPACITY[roomNumberContainer.value];

    roomNumberContainer.setCustomValidity('');
    roomNumberContainer.checkValidity();
    if (capacityArray.indexOf(capacityContainer.value) < 0) {
      roomNumberContainer.setCustomValidity('Количество комнат не подходит для количества гостей');
    }
  };
  roomNumberContainer.addEventListener('change', validateGuests);
  capacityContainer.addEventListener('change', validateGuests);

  error.addEventListener('click', function () {
    error.style.display = 'none';
  });

  var onError = function (textError) {
    error.style.display = 'block';
    error.textContent = textError;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var resetForm = function () {
    var mapMarks = map.querySelectorAll('.map__pin:not(:last-of-type)');

    adForm.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pinMain.style.left = DEFAULT_MAP_PIN_X + 'px';
    pinMain.style.top = DEFAULT_MAP_PIN_Y + 'px';
    window.map.disablePage();
    window.card.existenceCard();
    for (var i = 0; i < mapMarks.length; i++) {
      mapMarks[i].parentNode.removeChild(mapMarks[i]);
    }
    window.map.enablePage();
  };

  var clearBtn = document.querySelector('.ad-form__reset');
  clearBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  var successElement = document.querySelector('.success');

  var onSuccess = function () {
    resetForm();
    successElement.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var closeSuccess = function () {
    document.addEventListener('click', function () {
      successElement.classList.add('hidden');
    });
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccess();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, onError);
  });

  window.form = {
    onError: onError
  };
})();
