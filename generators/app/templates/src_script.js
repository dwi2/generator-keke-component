export default (function () {
  // TODO: please define your component here.
  var proto = Object.create(HTMLElement.prototype);
  return document.registerElement('<%= componentName %>', {prototype: proto});
}());