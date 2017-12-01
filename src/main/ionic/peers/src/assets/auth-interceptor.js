(function (open) {

  XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
    if (url !== 'https://cognito-idp.us-west-2.amazonaws.com/') {
      if (localStorage.isLoggedIn === 'false') {
        location.reload();
      }
    }

    this.addEventListener("readystatechange", function () {
      if (this.status === 401) {
        location.reload();
      }
    }, false);
    open.apply(this, arguments);
  };

})(XMLHttpRequest.prototype.open);
