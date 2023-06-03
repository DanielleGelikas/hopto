const url = 'https://api.instagram.com/oauth/authorize?client_id=547762730900603&redirect_uri=https://daniellegelikas.github.io/hopto/&scope=user_profile&response_type=code'


logic.prototype._makeApiRequest = function makeApiRequest(url, callback) {
    var called = false;
    var scope = this;
    var apiRequest = null;
    var callbackOnce = function callbackOnce(err, value) {
      if (!called) {
        called = true;
        callback(err, value);
      }
    };

    apiRequest = new XMLHttpRequest();

    apiRequest.ontimeout = function apiRequestTimedOut() {
      callbackOnce(new Error('api request timed out'));
    };
  
    apiRequest.onerror = function apiRequestOnError() {
      callbackOnce(new Error('api connection error'));
    };
  
    apiRequest.onload = function apiRequestOnLoad(event) {
      var contentType = apiRequest.getResponseHeader('Content-Type');
      var responseJson = null;
  
      scope._debug('apiRequestOnLoad', 'loaded', event);
      scope._debug('apiRequestOnLoad', 'response status', apiRequest.status);
      scope._debug('apiRequestOnLoad', 'response content type', contentType);
  
      if (contentType.indexOf('application/json') >= 0) {
        try {
          responseJson = JSON.parse(apiRequest.responseText);
        } catch (err) {
          scope._debug('apiRequestOnLoad', 'json parsing error', err, apiRequest.responseText);
          callbackOnce(new Error('error parsing response json'));
          return;
        }
      }
  
      if (apiRequest.status !== 200) {
        if (responseJson && responseJson.error) {
          callbackOnce(new Error(responseJson.error.code + ' ' + responseJson.error.message));
        } else {
          callbackOnce(new Error('status code ' + apiRequest.status));
        }
        return;
      }
  
      callbackOnce(null, responseJson);
    };
  
    apiRequest.open('GET', url, true);
    apiRequest.timeout = this._options.apiTimeout;
    apiRequest.send();
  };
