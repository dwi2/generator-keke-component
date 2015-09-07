'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kryptonian ' + chalk.red('KekeComponent') + ' generator!'
    ));

    var validNameRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    var prompts = [{
      name: 'componentName',
      message: 'What is the name of your component ?',
      validate: function(value) {
        if (validNameRegex.exec(value)) {
          return true;
        } else {
          return 'Please enter a valid value like "a-valid-component-name"';
        }
      }
    }, {
      name: 'description',
      message: 'What is descrption of your component (optional) ?'
    }, {
      name: 'repoGitUrl',
      message: 'What is git repo url of your component (optional) ?'
    }];

    this.prompt(prompts, function (props) {
      var capitalizeFirstLetter = function(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      };
      var dash2Camel = function(name) {
        var camelCase = name.replace( /-+(.)/gi, function (match, capture1) {
          return capture1.toUpperCase();
        });
        return capitalizeFirstLetter(camelCase);
      };

      // To access props later use this.props.someOption;
      this.props = props;
      this.props.camelCaseComponentName = dash2Camel(this.props.componentName);
      this.destinationRoot('./' + this.props.componentName);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('src_script.js'),
        this.destinationPath('src/script.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('examples_index.html'),
        this.destinationPath('examples/index.html'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('test_script_test.js'),
        this.destinationPath('test/script_test.js'),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
      this.fs.copy(
        this.templatePath('_karma.conf.js'),
        this.destinationPath('karma.conf.js')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
