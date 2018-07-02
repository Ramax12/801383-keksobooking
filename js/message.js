'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');

  var onSuccess = function () {
    window.wizards();
    setup.classList.add('hidden');
  };

  var onError = function (textError) {
    var node = document.createElement('div');
    node.style.position = 'absolute';
    node.style = 'z-index: 9; background-color: red; font-size: 24px;';
    node.textContent = textError;
    document.body.insertAdjacentElement('afterbegin', node);

    form.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(form), onSuccess, onError);
      evt.preventDefault();
    });
    window.backend.load(onSuccess, onError);
  };
})();
