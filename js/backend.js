'use strict';

(function () {
  var LOAD_TIMEOUT = 5000;
  var LOAD_SUCCESS = 200;

  var xhrListener = function (onLoad, onError, method, URL, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = LOAD_TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case LOAD_SUCCESS:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('method', URL);
    xhr.send(data);
  };

  window.backend = {
    load: function(onLoad, onError) {
      xhrListener(onLoad, onError, 'GET', 'http://127.0.0.1:8000/booking.json', null);
    },
    save: function(data, onLoad, onError) {
      xhrListener(onLoad, onError, 'POST', 'https://js.dump.academy/keksobooking', data);
    }
  };
})();

  // var load = function (onLoad, onError) {
  //   var URL = 'http://127.0.0.1:8000/booking.json';
  //   var xhr = new XMLHttpRequest();

  //   xhr.responseType = 'json';
  //   xhr.timeout = LOAD_TIMEOUT;

  //   xhr.addEventListener('load', function () {
  //     switch (xhr.status) {
  //       case LOAD_SUCCESS:
  //         onLoad(xhr.response);
  //         break;
  //       default:
  //         onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.open('GET', URL);
  //   xhr.send();
  // };

  // var save = function (data, onLoad, onError) {
  //   var URL = 'https://js.dump.academy/keksobooking';
  //   var xhr = new XMLHttpRequest();
  //   xhr.timeout = SAVE_TIMEOUT;

  //   xhr.addEventListener('load', function () {
  //     switch (xhr.status) {
  //       case LOAD_SUCCESS:
  //         onLoad();
  //         break;
  //       default:
  //         onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Данные не успели отправиться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.open('POST', URL);
  //   xhr.send(data);
  // };

