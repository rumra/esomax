var Metalsmith = require("metalsmith");
var layouts = require("metalsmith-layouts");
var handlebars = require("handlebars");
var serve = require("metalsmith-serve");
var watch = require("metalsmith-watch");

var handlebarsLayouts = require('handlebars-layouts');

handlebars.registerHelper(handlebarsLayouts(handlebars));
handlebarsLayouts.register(handlebars);


Metalsmith(__dirname)
  .source("app/src")
  .use(
    layouts({
      engine: 'handlebars',
      directory: 'app/layouts',
      partials: 'app/layouts/layout'
    })
  )
  .use(serve())
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "app/layouts/**/*": "**/*.hbs",
      },
      livereload: true,
    })
  )

/*     *******************    */
/*     plugin chain to        */
/*     manipulate files       */
/*     *******************    */

  .destination("docs")
  .build(function(err) {
    if (err) throw err;
    console.log('Build finished!');
  });
