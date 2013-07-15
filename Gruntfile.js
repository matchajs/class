module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        transport: {
            options: {
                idleading: '<%= pkg.organization %>/<%= pkg.name %>/<%= pkg.version %>/'  //生成的id的格式
            },
            'class': {
                files: [{
                    cwd: 'src',
                    src: 'class.js',
                    dest: '~build'
                }]
            }

        },

        concat: {
            'class': {
                options: {
                    relative: true
                },
                files: {
                    'dist/<%= pkg.version %>/class.js': ['~build/class.js'],
                    'dist/<%= pkg.version %>/class-debug.js': ['~build/class-debug.js']
                }
            }
        },

        uglify: {
            options: {
                beautify: {
                    ascii_only: true
                },
                sourceMap: 'dist/<%= pkg.version %>/class.js.map'
            },
            'class': {
                files: {
                    'dist/<%= pkg.version %>/class.js': ['dist/<%= pkg.version %>/class.js']
                }
            }
        },

        clean: {
            build: ['~build']
        }
    });

    grunt.registerTask("fix", "Fix sourceMap etc.", function() {
        var mapfile = "dist/1.0.0/class.js.map"

        var code = grunt.file.read(mapfile)
        code = code.replace('"file":"dist/1.0.0/class.js"', '"file":"class.js"')
        code = code.replace('"sources":["dist/1.0.0/class.js"]', '"sources":["class-debug.js"]')
        grunt.file.write(mapfile, code)
        grunt.log.writeln('"' + mapfile + '" is fixed.')
    })

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean', 'fix']);
};