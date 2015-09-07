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

    var prompts = [{
      name: 'componentName',
      message: 'What is the name of your component ?'
    }, {
      name: 'description',
      message: 'What is descrption of your component ?'
    }, {
      name: 'repoGitUrl',
      message: 'What is git repo url of your component ?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      if (!this.props.componentName) {
        throw new Error('Must specify name of component');
      } else {
        this.destinationRoot('./' + this.props.componentName);
      }
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.log(this.destinationRoot());
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
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
