'use strict';

(function () {
  var MIN_PIN_TOP = 130;
  var MAX_PIN_RIGHT = 1135;
  var MAX_PIN_BOTTOM = 630;
  var MIN_PIN_LEFT = 0;
  var LIMIT_MARKS = 5;
  var MARK_WIDTH = 25;
  var MARK_HEIGHT = 70;

  var map = document.querySelector('.map');
  var similarMarkElement = map.querySelector('.map__pins');
  var similarMarkTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var pinMain = document.querySelector('.map__pin--main');
  var mapPinAddress = document.querySelector('#address');
  var markActive;

  var renderMark = function (mark) {
    var markElement = similarMarkTemplate.cloneNode(true);

    markElement.style.left = mark.location.x - MARK_WIDTH + 'px';
    markElement.style.top = mark.location.y - MARK_HEIGHT + 'px';
    markElement.querySelector('.map__pin img').src = mark.author.avatar;
    markElement.querySelector('.map__pin img').alt = mark.offer.title;
    markElement.addEventListener('click', function () {
      mapFiltersContainer.parentNode.insertBefore(window.card.renderCard(mark), mapFiltersContainer);
      activeMark(markElement);
    });

    return markElement;
  };

  var renderMarksAll = function (marks) {
    var mapMarks = map.querySelectorAll('.map__pin:not(:last-of-type)');
    for (var i = 0; i < mapMarks.length; i++) {
      mapMarks[i].remove();
    }
    var fragment = document.createDocumentFragment();
    marks.slice(0, LIMIT_MARKS).forEach(function (mark) {
      fragment.appendChild(renderMark(mark));
    });
    return similarMarkElement.insertBefore(fragment, pinMain);
  };

  var activeMark = function (element) {
    activeMarkHide();
    markActive = element;
    markActive.classList.add('map__pin--active');
  };

  var activeMarkHide = function () {
    if (markActive) {
      markActive.classList.remove('map__pin--active');
    }
  };

  var facetBlock = function () {
    if (pinMain.offsetTop > MAX_PIN_BOTTOM) {
      pinMain.style.top = MAX_PIN_BOTTOM + 'px';
    } else if (pinMain.offsetTop < MIN_PIN_TOP) {
      pinMain.style.top = MIN_PIN_TOP + 'px';
    }

    if (pinMain.offsetLeft > MAX_PIN_RIGHT) {
      pinMain.style.left = MAX_PIN_RIGHT + 'px';
    } else if (pinMain.offsetLeft < MIN_PIN_LEFT) {
      pinMain.style.left = MIN_PIN_LEFT + 'px';
    }
  };

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

      facetBlock();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapPinAddress.value = window.map.calculateAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    renderMarksAll: renderMarksAll
  };
})();
