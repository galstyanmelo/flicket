// eslint-disable-next-line no-extend-native
Array.prototype.isEmpty = function () {
  return this.length === 0;
};

// eslint-disable-next-line no-extend-native
String.prototype.capitalizeFirst = function () {
  if (this.length === 0) return this;
  return this.charAt(0).toUpperCase() + this.slice(1);
};