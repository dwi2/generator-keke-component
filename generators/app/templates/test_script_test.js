'use strict';

suite('<%= componentName %> >', function() {
  var subject;

  setup(function() {
    this.sinon = sinon.sandbox.create();
    this.sinon.useFakeTimers();

    subject = new <%= capitalizedCamelCaseComponentName %>();
  });

  teardown(function() {
    this.sinon.clock.restore();
    this.sinon.restore();

    subject = undefined;
  });

  test('one plus one equals two', function() {
    assert.equal(1 + 1, 2);
  });

  // TODO: write unit test of your components
});