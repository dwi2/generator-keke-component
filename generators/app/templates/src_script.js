export default (function () {
  var proto = Object.create(HTMLElement.prototype);
  // TODO: please define your component here.

  return document.registerElement('<%= componentName %>', {prototype: proto});
}());
