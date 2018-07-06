'use strict';

(function () {
  var MAX_PIN_TOP = 130;
  var MAX_PIN_RIGHT = 1135;
  var MAX_PIN_BOTTOM = 630;
  var MAX_PIN_LEFT = 0;

  var MAP_PIN_WIDTH = 64;
  var MAP_PIN_HEIGHT = 64;
  var TAIL_HEIGHT = 22;
  var LIMIT_MARKS = 5;

  var map = document.querySelector('.map');
  var similarMarkElement = map.querySelector('.map__pins');
  var similarMarkTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapPinAddress = document.querySelector('#address');
  var inactiveFields = document.querySelectorAll('fieldset');

  var renderMark = function (mark) {
    var markElement = similarMarkTemplate.cloneNode(true);

    markElement.style.left = mark.location.x - 25 + 'px';
    markElement.style.top = mark.location.y - 70 + 'px';
    markElement.querySelector('.map__pin img').src = mark.author.avatar;
    markElement.querySelector('.map__pin img').alt = mark.offer.title;
    markElement.addEventListener('click', function () {

      mapFiltersContainer.parentNode.insertBefore(window.card.renderCard(mark), mapFiltersContainer);
    });

    return markElement;
  };

  var renderMarksAll = function (marks) {
    var mapPins = map.querySelectorAll('.map__pin:not(:last-of-type)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < (marks.length > 5 ? LIMIT_MARKS : marks.length); j++) {
      fragment.appendChild(renderMark(marks[j]));
    }
    return similarMarkElement.insertBefore(fragment, pinMain);
  };

  // Определение координат метки
  var calculateAddress = function () {
    var pinMainX = parseInt(pinMain.style.left, 10) + MAP_PIN_WIDTH / 2;
    var pinMainY = parseInt(pinMain.style.top, 10) + MAP_PIN_HEIGHT / 2;
    if (!(map.classList.contains('map--faded'))) {
      pinMainY += MAP_PIN_HEIGHT / 2 + TAIL_HEIGHT;
    }
    return pinMainX + ', ' + pinMainY;
  };

  // Неактивное состояние
  var disablePage = function () {
    for (var i = 0; i < inactiveFields.length; i++) {
      inactiveFields[i].setAttribute('disabled', 'disabled');
    }
    mapPinAddress.value = calculateAddress();
  };
  disablePage();

  // Активное состояние
  var enablePage = function () {
    pinMain.addEventListener('click', function isMapActive() {
      window.backend.load(function (marks) {
        window.marks = marks;
        renderMarksAll(marks);
      }, window.form.onError);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapPinAddress.value = calculateAddress();
      for (var i = 0; i < inactiveFields.length; i++) {
        inactiveFields[i].removeAttribute('disabled', 'disabled');
      }
      pinMain.removeEventListener('click', isMapActive);
    });
  };
  enablePage();

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      if (pinMain.offsetTop > MAX_PIN_BOTTOM) {
        pinMain.style.top = MAX_PIN_BOTTOM + 'px';
      } else if (pinMain.offsetTop < MAX_PIN_TOP) {
        pinMain.style.top = MAX_PIN_TOP + 'px';
      }

      if (pinMain.offsetLeft > MAX_PIN_RIGHT) {
        pinMain.style.left = MAX_PIN_RIGHT + 'px';
      } else if (pinMain.offsetLeft < MAX_PIN_LEFT) {
        pinMain.style.left = MAX_PIN_LEFT + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapPinAddress.value = calculateAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    disablePage: disablePage,
    enablePage: enablePage,
    renderMarksAll: renderMarksAll
  };
})();
