module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        
        //sass compile
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/default.css': 'build/sass/default.scss'
                }
            } 
        },



        //concat all the JS files
        concat: {   
            scripts: {
                src: ['build/js/jquery.js', 'build/js/bootstrap.min.js'],
                dest: 'js/UI_production.js'
            },

            styles: {
                src: ['build/css/bootstrap.min.css','build/css/default.css'],
                dest: 'css/UI_production.css'
            }
        },

        // minify concat file
        uglify: {
            my_target: {
                files: {
                    'js/UI_production.min.js': ['js/UI_production.js']
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                  'css/UI_production.min.css': ['css/UI_production.css']
                }
            }
        },

        //watch script
        watch:{
            scripts:{
                files:['build/js/*'],
                tasks:['concat:scripts', 'uglify'],
                options:{
                    spawn:false
                }
            },

            styles:{
                files:['build/sass/**/*.scss', 'build/css/*'],
                tasks:['sass', 'concat:styles', 'cssmin'],
                options:{
                    spawn:false
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};