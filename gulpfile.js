 var gulp=require("gulp"); 

var mincss=require("gulp-clean-css"); 

var minjs=require("gulp-uglify"); 

var minhtml=require("gulp-htmlmin"); 

var sass=require("gulp-sass"); 

var server=require("gulp-webserver"); 

var data=require("./src/data/data.json");

var sequence=require("gulp-sequence");

var clean=require("gulp-clean");


gulp.task("default",function(callback){
   sequence("clean",["mincss","minhtml","minjs"],"watch","server",callback)
})

gulp.task("clean",function(){
  return gulp.src("dist")
   .pipe(clean())
})

gulp.task("mincss",function(){
  return gulp.src("./src/css/*.scss")
   .pipe(sass())
   .pipe(mincss())
   .pipe(gulp.dest("dist/css"))
})

var options = {
   removeComments: true, //清除HTML注释
   collapseWhitespace: true, //压缩HTML
   //collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
   removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
   // removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
   // removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
   // minifyJS: true, //压缩页面JS
   // minifyCSS: true //压缩页面CSS
};

gulp.task("minhtml",function(){
  return gulp.src("./src/*.html")
   .pipe(minhtml(options))
   .pipe(gulp.dest("dist"))
})

gulp.task("copyjs",function(){
  return gulp.src("src/js/*.js")
   .pipe(gulp.dest("dist/js"))
})

gulp.task("minjs",function(){
  return gulp.src("./src/js/demo.js")
   .pipe(minjs())
   .pipe(gulp.dest("dist/js"))
})

gulp.task("watch",function(){
   gulp.watch("src/*.html",["minhtml"])
   gulp.watch("src/css/*.scss",["mincss"])
   gulp.watch("src/js/*.js",['minjs'])
})

gulp.task("server",function(){
   gulp.src("./src")
   .pipe(server({
        port:8090,
        open:true,
        livereload:true,
        host:"localhost",
        middleware:function(req,res,next){
            if(/\/list/g.test(req.url)){
               res.end(JSON.stringify(data))
            } 
            next()
        }
   }))
})
