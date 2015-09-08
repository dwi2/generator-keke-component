'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('keke-component:app', function () {
  var filePaths = [
    'package.json',
    'bower.json',
    'gulpfile.js',
    'src/script.js',
    'examples/index.html',
    'test/script_test.js',
    '.eslintrc',
    '.babelrc',
    'karma.conf.js',
    '.gitignore',
    'README.md'
  ];

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .withPrompts({componentName: 'some-component'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file(filePaths);
  });

  it('should not have any <%, <%=, or %> in files', function() {
    filePaths.forEach(function(filePath) {
      assert.fileContent(filePath, /[^(<%)(<%=)(%>]/);
    });
  });
});
