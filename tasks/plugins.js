/*
 * grunt plugins page
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 grunt contributors
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var fs = require('fs');

module.exports = function (grunt) {

  var pug = require('pug');
  var marked = require('marked');
  var plugins = require('../grunt-plugins');

  /**
   * Custom task to generate the plugins page
   */
  grunt.registerTask('plugins', 'Compile Grunt Plugins Page', function () {
    var pluginTpl = 'src/tmpl/plugins.pug';
    var base = 'node_modules/grunt-docs/';

    // Set default marked options
    marked.setOptions({
      gfm: true,
      base: '/',
      sanitize: false
    });

    grunt.log.ok('Generating plugins page...');
    var output = pug.compile(grunt.file.read(pluginTpl), {filename: pluginTpl})({
      page: 'plugins',
      title: 'Plugins',
      content: marked(grunt.file.read(base + 'Grunt-Plugins.md'))
    });
    grunt.file.write('build/plugins.html', output);
  });

  grunt.registerTask('downloadPlugins', 'Download Plugin Information', function () {
    var done = this.async();

    request({
      url: `https://gruntjs.com/plugin-list.json?_=${Date.now()}`,
      json: true
    }, function handlePlugin(error, response, body) {
      // console.log(body);
      fs.writeFileSync('build/plugin-list.json', JSON.stringify(body));
      done();
    });

    // plugins.download({cache: true}, function() {
    //   done();
    // });

    // var output = grunt.file.read('./plugin-list.json');
    // grunt.file.write('build/plugin-list.json', output);
  });
};
