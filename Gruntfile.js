module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		qunit: {
			files: ['test/**/**/*.html']
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

	// tasks
	grunt.registerTask('test', ['qunit']);
	grunt.registerTask('default', ['qunit', 'concat', 'uglify']);
};