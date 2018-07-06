'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('.map__features');

  var checkType = function (advert) {
    return (filterType.value === advert.offer.type) || (filterType.value === 'any');
  };

  var checkPrice = function (advert) {
    switch (filterPrice.value) {

      case 'low':
        return advert.offer.price < 10000;

      case 'middle':
        return advert.offer.price > 10000 && advert.offer.price < 50000;

      case 'high':
        return advert.offer.price > 50000;

      default:
        return true;
    }
  };

  var checkRooms = function (advert) {
    return (advert.offer.rooms === +filterRooms.value) || (filterRooms.value === 'any');
  };

  var checkGuests = function (advert) {
    return (advert.offer.guests === +filterGuests.value) || (filterGuests.value === 'any');
  };

  var checkFeatures = function (advert) {
    var checkedElements = filterFeatures.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < checkedElements.length; i++) {
      if (checkedElements[i].checked && advert.offer.features.indexOf(checkedElements[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  var filter = function () {
    window.debounce(function () {
      var marks = window.marks.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests).filter(checkFeatures);
      window.pin.renderMarksAll(marks);
    });
  };

  filterType.addEventListener('change', filter);
  filterPrice.addEventListener('change', filter);
  filterRooms.addEventListener('change', filter);
  filterGuests.addEventListener('change', filter);
  filterFeatures.addEventListener('change', filter);

})();
