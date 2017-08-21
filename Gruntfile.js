module.exports = function (grunt) {
    grunt.initConfig({

        // WATCH task config
        watch: {
            sass: {
                files: ['source/**/*.sass', 'source/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'concat']
            },

            css: {
                files: ['source/**/*.sass', 'source/**/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },

            pug: {
                files: ['source/**/*.pug'],
                tasks: ['pug']
            },

            js: {
                files: ['source/assets/js/*.js'],
                tasks: ['concat', 'uglify']
            },

            // browserSync: {
            //     files: ['app/**/*.css', 'app/**/*.html'],
            //     tasks: ['pug']
            //  },

        },

        // SASS task config
        sass: {
            dev: {
                files: {
                    // destination				// source file
                    'source/assets/css/app.min.css':			'source/sass/styles.scss',
                },
                options: {
                    style: 'compressed'
                }
            }
        },

        // AUTOPREFIXER
        autoprefixer: {
            dev: {
                files: {
                    'app/assets/css/slottoball.min.css': 'app/assets/css/slottoball.min.css'
                }
            }
        },

        // PUG
        pug: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [ {
                    cwd: 'source',
                    src: '*.pug',
                    dest: 'app/',
                    expand: true,
                    ext: '.html'
                }]
            }
        },

        concat: {

            js: {
                // the files to concatenate
                src: ['source/assets/js/custom.js'],
                // the location of the resulting JS file
                dest: 'app/assets/js/slottoball.js',
                options: {
                    // define a string to put between each file in the concatenated output
                    separator: ';'
                }

            },

            css: {
                src: ['source/assets/css/app.min.css'],
                dest: 'app/assets/css/slottoball.min.css'
            }

        },

        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'app/assets/js/slottoball.min.js': ['app/assets/js/slottoball.js']
                }
            }
        },


        copy: {
            //app: {
            //	files: [{
            //			src: [ 'js/*','style/**/*.css', '!**/*.jade', 'img/**/*'],
            //			dest: './app'
            //		}]
            //}
            app: {
                cwd: 'sources',
                src: [ 'js/*','style/**/*.css', '!**/*.jade', 'img/**/*' ],
                dest: 'app',
                expand: true
            }
        },


        clean: {
            app: ['./app/**']
        },



        base64: {
            target: {
                files: {
                    src: 'app/assets/images/logo/*.png',
                    dest: 'app/b64/'
                }
            }
        },



        // Using the BrowserSync Server for your static .html files.
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        'app/css/*.css',
                        'app/*.html'
                        // '*.pug',
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './app'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-base64');

    grunt.registerTask('default', ['browserSync', 'watch']);
};