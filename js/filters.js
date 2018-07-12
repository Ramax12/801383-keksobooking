'use strict';

(function () {
  var PriceValue = {
    low: 10000,
    high: 50000
  };

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
    if (filterPrice.value === 'low') {
      return advert.offer.price < PriceValue.low;
    }
    if (filterPrice.value === 'middle') {
      return advert.offer.price >= PriceValue.low && advert.offer.price <= PriceValue.high;
    }
    if (filterPrice.value === 'high') {
      return advert.offer.price > PriceValue.high;
    }
    return true;
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
      if (checkedElements[i] && advert.offer.features.indexOf(checkedElements[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  var onFilterChange = function () {
    window.debounce(function () {
      var marks = window.marks.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests).filter(checkFeatures);
      window.card.close();
      window.pin.renderAllMarks(marks);
    });
  };

  filterType.addEventListener('change', onFilterChange);
  filterPrice.addEventListener('change', onFilterChange);
  filterRooms.addEventListener('change', onFilterChange);
  filterGuests.addEventListener('change', onFilterChange);
  filterFeatures.addEventListener('change', onFilterChange);

})();
