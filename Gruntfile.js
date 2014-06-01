module.exports = function (grunt) {
	'use strict';
    require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		,jshint: {
			options: { jshintrc: '.jshintrc' },
			files: ['src/idleView.js']
		}
		,version_git: {
			main: {
				files: {src: [
					'package.json'
					,'src/idleView.js'
				]}
			}
		}
		,less: {
			example: {
				options: { compress: false }
				,src: ['example/example.less']
				,dest: 'example/example.css'
			}
		}
		,uglify: {
			my_target: {
				files: {
					'dist/idleView.min.js': ['src/idleView.js']
				}
			}
		}
	});
	grunt.registerTask('default',[
		'uglify'
	]);
};