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
				dest: 'dist/<%= pkg.name %>.min.js'
			},

			all: {
				src: ['<%= concat.dist.dest %>'].concat( [ 'src/modules/animate/fw.animate.js', 'src/modules/bindables/fw.bindables.js', 'src/modules/templates/fw.templates.js' ]),
				dest: 'dist/<%= pkg.name %>.all.js'
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
					'dist/<%= pkg.name %>.all.js'		: ['<%= concat.all.dest %>'],

					'dist/modules/core/fw.core.min.js'				: ['src/modules/core/fw.core.js'],
					'dist/modules/ajax/fw.ajax.min.js'				: ['src/modules/ajax/fw.ajax.js'],
					'dist/modules/animate/fw.animate.min.js'		: ['src/modules/animate/fw.animate.js'],
					'dist/modules/bindables/fw.bindables.min.js'	: ['src/modules/bindables/fw.bindables.js'],
					'dist/modules/templates/fw.templates.min.js'	: ['src/modules/templates/fw.templates.js'],
					'dist/modules/css/fw.css.min.js'				: ['src/modules/css/fw.css.js'],
					'dist/modules/data/fw.data.min.js'				: ['src/modules/data/fw.data.js'],
					'dist/modules/dom/fw.dom.min.js'				: ['src/modules/dom/fw.dom.js'],
					'dist/modules/events/fw.events.min.js'			: ['src/modules/events/fw.events.js']
				}
			},

			modules: {
				files: {
					'dist/modules/core/fw.core.min.js'				: ['src/modules/core/fw.core.js'],
					'dist/modules/ajax/fw.ajax.min.js'				: ['src/modules/ajax/fw.ajax.js'],
					'dist/modules/animate/fw.animate.min.js'		: ['src/modules/animate/fw.animate.js'],
					'dist/modules/templates/fw.templates.min.js'	: ['src/modules/templates/fw.templates.js'],
					'dist/modules/css/fw.css.min.js'				: ['src/modules/css/fw.css.js'],
					'dist/modules/data/fw.data.min.js'				: ['src/modules/data/fw.data.js'],
					'dist/modules/dom/fw.dom.min.js'				: ['src/modules/dom/fw.dom.js'],
					'dist/modules/events/fw.events.min.js'			: ['src/modules/events/fw.events.js'],
					'dist/modules/bindables/fw.bindables.min.js'	: ['src/modules/bindables/fw.bindables.js']
				}
			}
		},

		compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				expand: true,
				src: ['dist/framewreck.min.js'],
				ext: '.min.js.gz'
			},

			all: {
				options: {
					mode: 'gzip'
				},
				expand: true,
				src: ['dist/framewreck.all.js'],
				ext: '.all.js.gz'
			}
		},

		jsdoc : {
			basic : {
				src: ['src/**/**/*.js'],
				options: {
					destination: 'docs/',
					template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
					configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"

				}
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// tasks
	//grunt.registerTask('docs', ['jsdoc']);
	grunt.registerTask('test', ['qunit']);
	grunt.registerTask('default', ['qunit', 'concat', 'uglify', 'compress']);
};