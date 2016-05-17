if (typeof Array.prototype.clone === 'undefined') {
  Array.prototype.clone = function () {
    return this.slice(0);
  };
}
