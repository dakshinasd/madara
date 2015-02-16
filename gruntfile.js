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
                    'dev/assets/build/css/default.css': 'dev/assets/build/sass/default.scss'
                }
            } 
        },



        //concat all the JS files
        concat: {   
            scripts: {
                src: ['dev/assets/build/js/jquery.js', 'dev/assets/build/js/bootstrap.min.js'],
                dest: 'dev/assets/js/UI_production.js'
            },

            styles: {
                src: ['dev/assets/build/css/bootstrap.min.css','dev/assets/build/css/default.css'],
                dest: 'dev/assets/css/UI_production.css'
            }
        },

        // minify concat file
        uglify: {
            my_target: {
                files: {
                    'dev/assets/js/UI_production.min.js': ['dev/assets/js/UI_production.js']
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                  'dev/assets/css/UI_production.min.css': ['dev/assets/css/UI_production.css']
                }
            }
        },

        //watch script
        watch:{
            scripts:{
                files:['dev/assets/build/js/*'],
                tasks:['concat:scripts', 'uglify'],
                options:{
                    spawn:false
                }
            },

            styles:{
                files:['dev/assets/build/sass/**/*.scss', 'dev/assets/build/css/*'],
                tasks:['sass', 'concat:styles', 'cssmin'],
                options:{
                    spawn:false
                }
            }
        },

        //copy all the production ready files to production folder
        copy: {
          main: {
            src: 'dev/**',
            dest: 'production/',
            flatten:true
          },
        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};