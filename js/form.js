'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var RoomNumberAndCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var MinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var priceContainer = document.querySelector('#price');
  var typeContainer = document.querySelector('#type');
  var timeInContainer = document.querySelector('#timein');
  var timeOutContainer = document.querySelector('#timeout');
  var roomNumberContainer = document.querySelector('#room_number');
  var capacityContainer = document.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');
  var error = document.querySelector('.error');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var inactiveFields = document.querySelectorAll('fieldset');

  var enable = function () {
    inactiveFields.forEach(function (field) {
      field.removeAttribute('disabled', 'disabled');
    });
    adForm.classList.remove('ad-form--disabled');
  };

  var disable = function () {
    inactiveFields.forEach(function (field) {
      field.setAttribute('disabled', 'disabled');
    });
    adForm.classList.add('ad-form--disabled');
    adForm.classList.remove('ad-form__submit--wrong-field');
    adForm.reset();
  };
  disable();

  var onChangeTypeChange = function () {
    var minValuePrice = MinPrice[typeContainer.value];

    priceContainer.setAttribute('min', minValuePrice);
    priceContainer.setAttribute('placeholder', minValuePrice);
  };
  typeContainer.addEventListener('change', onChangeTypeChange);

  timeInContainer.addEventListener('change', function () {
    timeOutContainer.value = timeInContainer.value;
  });

  timeOutContainer.addEventListener('change', function () {
    timeInContainer.value = timeOutContainer.value;
  });

  var onValidateGuestsChange = function () {
    var valueRoom = roomNumberContainer.value;
    var capacityArray = RoomNumberAndCapacity[valueRoom];

    for (var i = 0; i < capacityContainer.options.length; i++) {
      capacityContainer.options[i].disabled = (!capacityArray.includes(capacityContainer.options[i].value));
    }
    capacityContainer.value = capacityArray.includes(valueRoom) ? valueRoom : RoomNumberAndCapacity[valueRoom];
  };
  roomNumberContainer.addEventListener('change', onValidateGuestsChange);

  error.addEventListener('click', function () {
    error.style.display = 'none';
  });

  var onError = function (textError) {
    error.style.display = 'block';
    error.textContent = textError;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  var onResetFormClick = function () {
    disable();
    window.pin.removeAllMarks();
    window.card.close();
    window.map.setInactive();
    onChangeTypeChange();
  };

  var clearBtn = document.querySelector('.ad-form__reset');
  clearBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    onResetFormClick();
  });

  var successElement = document.querySelector('.success');

  var onSuccess = function () {
    onResetFormClick();
    successElement.classList.remove('hidden');
    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessClick = function () {
    successElement.classList.add('hidden');
    document.removeEventListener('click', onSuccessClick);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      successElement.classList.add('hidden');
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, onError);
  });

  adFormSubmit.addEventListener('click', function () {
    adForm.classList.add('ad-form__submit--wrong-field');
  });

  window.form = {
    onError: onError,
    disable: disable,
    enable: enable
  };
})();
