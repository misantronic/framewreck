module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		qunit: {
			all: ['test/**/*.html']
		},

		concat: {
			options: {
				separator: ''
			},
			dist: {
				src: [
					'src/modules/core/fw.core.js',
					'src/modules/ajax/fw.ajax.js',
					'src/modules/css/fw.css.js',
					'src/modules/data/fw.data.js',
					'src/modules/dom/fw.dom.js',
					'src/modules/events/fw.events.js'
				],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				mangle: {
					except: ['F', '$M']
				}
			},

			dist: {
				options: {
					banner: '/*! <%= pkg.name %> <%= pkg.version %> build on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				files: {
					'dist/<%= pkg.name %>.min.js'		: ['<%= concat.dist.dest %>'],

					'dist/modules/core/fw.core.min.js'			: ['src/modules/core/fw.core.js'],
					'dist/modules/ajax/fw.ajax.min.js'			: ['src/modules/ajax/fw.ajax.js'],
					'dist/modules/animate/fw.animate.min.js'	: ['src/modules/animate/fw.animate.js'],
					'dist/modules/css/fw.css.min.js'			: ['src/modules/css/fw.css.js'],
					'dist/modules/data/fw.data.min.js'			: ['src/modules/data/fw.data.js'],
					'dist/modules/dom/fw.dom.min.js'			: ['src/modules/dom/fw.dom.js'],
					'dist/modules/events/fw.events.min.js'		: ['src/modules/events/fw.events.js']
				}
			},

			modules: {
				files: {
					'dist/modules/core/fw.core.min.js'			: ['src/modules/core/fw.core.js'],
					'dist/modules/ajax/fw.ajax.min.js'			: ['src/modules/ajax/fw.ajax.js'],
					'dist/modules/animate/fw.animate.min.js'	: ['src/modules/animate/fw.animate.js'],
					'dist/modules/css/fw.css.min.js'			: ['src/modules/css/fw.css.js'],
					'dist/modules/data/fw.data.min.js'			: ['src/modules/data/fw.data.js'],
					'dist/modules/dom/fw.dom.min.js'			: ['src/modules/dom/fw.dom.js'],
					'dist/modules/events/fw.events.min.js'		: ['src/modules/events/fw.events.js']
				}
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	// tasks
	grunt.registerTask('test', ['qunit']);
	grunt.registerTask('default', ['qunit', 'concat', 'uglify']);
};