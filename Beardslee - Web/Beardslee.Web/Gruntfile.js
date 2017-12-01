/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    //var buildPath = "wwwroot/";

    grunt.initConfig({
        clean: {
            delete_wwwroot: ['wwwroot/*']
        },
        copy: {
            mvc: {
                files: [
                    {
                        expand: true,
                        cwd: "views/",
                        src: ["**"],
                        dest: "wwwroot/views/"
                    }
                ]
            },
            bin: {
                files: [
                    {
                        expand: true,
                        cwd: "bin/",
                        src: ["**"],
                        dest: "wwwroot/bin/"
                    }
                ]
            },
            dotnet: {
                files: [
                    {
                        expand: true,
                        cwd: "",
                        src: ["global.asax", "web.config", "favicon.ico"],
                        dest: "wwwroot/"
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: "node_modules/bootstrap/dist/fonts/",
                        src: ["**"],
                        dest: "wwwroot/fonts/"
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: "app/",
                        src: ["**/*.html"],
                        dest: "wwwroot/app/"
                    }
                ]
            },
            css:{
                files:[
                    {
                        expand: true,
                        cwd: "app/",
                        src: ["**/*.css"],
                        dest: "wwwroot/app/"
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "app/",
                        src: ["**/*.{png,jpg,gif,svg}"],
                        dest: "wwwroot/app/"
                    }
                ]
            },
            systemjs: {
                files: [
                    {
                        expand: true,
                        cwd: "",
                        src: ["systemjs.config.js", "systemjs-angular-loader.js"],
                        dest: "wwwroot/"
                    }
                ]
            },
            myImages: {
                files: [
                    {
                        expand: true,
                        cwd: "Files/images/",
                        src: ["**"],
                        dest: "wwwroot/app/images/"
                    }
                ]
            },
            FontAwesomeFonts: {
                files: [
                    {
                        expand: true,
                        cwd: "Files/fonts/",
                        src: ["**"],
                        dest: "wwwroot/fonts/"
                    }
                ]
            }
        },
        concat: {
            css: {
                src: [
                    "node_modules/bootstrap/dist/css/bootstrap.css",
                    "Files/lib/bootstrap/css/bootstrap.min.css",
                    "Files/css/font-awesome.min.css",
                    "Files/css/animate.min.css",
                    "Files/css/styles.css"
                ],
                dest: "wwwroot/css/libs.css",
                options: { sourceMap: true }
            },
            libs: {
                src: [
                   // "node_modules/jquery/dist/jquery.js",
                    //"node_modules/bootstrap/dist/js/bootstrap.js",
                    "Files/js/jquery-3.1.1.min.js",
                    "Files/lib/bootstrap/js/bootstrap.min.js",
                    "Files/js/parallax.js",
                    "Files/js/wow.min.js",
                    "Files/js/Beardslee.js",
                    "Files/js/scripts.js"
                ],
                dest: "wwwroot/js/libs.js",
                option: { sourceMap: true }
            }
        },
        ts: {
            all:
                {
                    src: [
                        "app/**/*.ts",
                        "app/*.ts"
                    ],
                    out: "wwwroot/js/app.js",
                    html: ["app/**/*.html"],
                    options: {
                        target: "ES5",
                        module: "system",
                        sourceMap: true,
                        experimentalDecorators: true,
                        emitDecoratorMetadata: true,
                        moduleResolution: "node",
                        lib: ["es2015", "es2015.iterable", "dom"]
                    },
                    exclude: ["node_modules"]
                }
        },
        watch: {
            mvc: {
                files: ["views/**"],
                tasks: ["copy:mvc"]
            },
            dotnet: {
                files: ["global.asax", "web.config"],
                tasks: ["copy:dotnet"]
            },
            typescript: {
                files: ["app/**/*.ts"],
                tasks: ["ts:all"]
            },
            html: {
                files: ["app/**/*.html"],
                tasks: ["copy:html"]
            },
            css: {
                files: ["app/**/*.css"],
                tasks: ["copy:css"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("develop", ['clean', 'copy', 'concat', 'ts']);

    grunt.registerTask("deploy", ['clean', 'copy', 'concat']);
};