(function (open) {

  XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
    this.addEventListener("readystatechange", function () {
      if (this.status === 401) {
        location.reload();
      }
    }, false);
    open.apply(this, arguments);
  };

})(XMLHttpRequest.prototype.open);
