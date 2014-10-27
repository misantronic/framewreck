module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:8000/test/modules/core/fw.core.html',
						'http://localhost:8000/test/modules/ajax/fw.ajax.html',
						'http://localhost:8000/test/modules/css/fw.css.html',
						'http://localhost:8000/test/modules/data/fw.data.html',
						'http://localhost:8000/test/modules/dom/fw.dom.html',
						'http://localhost:8000/test/modules/events/fw.events.html'
					]
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '.'
				}
			}
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
				banner: '/*! <%= pkg.name %> <%= pkg.version %> build on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		}
	});

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// tasks
	grunt.registerTask('test', ['connect', 'qunit']);
	grunt.registerTask('default', ['connect', 'qunit', 'concat', 'uglify']);
};