'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var Types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var map = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('template')
      .content
      .querySelector('.map__card');

  var renderFeatures = function (features, container) {
    var content = '';
    for (var i = 0; i < features.length; i++) {
      content += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
    }
    container.innerHTML = content;
  };

  var photoElementTemplate = document.querySelector('template').content.querySelector('.popup__photo');
  var renderPhotos = function (photos, container) {
    container.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var photoElement = photoElementTemplate.cloneNode();
      photoElement.src = photos[i];
      container.appendChild(photoElement);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      close();
    }
  };

  var close = function () {
    if (cardElement) {
      map.removeChild(cardElement);
      cardElement = null;
      document.removeEventListener('keydown', onPopupEscPress);
      window.pin.activeMarkHide();
    }
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var cardElement = null;
  var render = function (mark) {
    close();
    cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = mark.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = mark.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = mark.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = Types[mark.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = mark.offer.rooms + ' комнаты для ' + mark.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mark.offer.checkin + ', выезд до ' + mark.offer.checkout;
    renderFeatures(mark.offer.features, cardElement.querySelector('.popup__features'));
    cardElement.querySelector('.popup__description').textContent = mark.offer.description;
    renderPhotos(mark.offer.photos, cardElement.querySelector('.popup__photos'));
    cardElement.querySelector('.popup__avatar').src = mark.author.avatar;

    document.addEventListener('keydown', onPopupEscPress);
    var popupClose = cardElement.querySelector('.popup__close');

    popupClose.addEventListener('click', close);
    mapFiltersContainer.parentNode.insertBefore(cardElement, mapFiltersContainer);
  };
  window.card = {
    render: render,
    close: close
  };
})();
