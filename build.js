var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
// var assets = require('metalsmith-assets');
var handlebars = require('handlebars');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var sass = require('metalsmith-sass');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

var handlebarsLayouts = require('handlebars-layouts');

handlebarsLayouts.register(handlebars);


Metalsmith(__dirname)
  .source('app/src')
  .use(
    collections({
      articles: {
        sortBy: 'date',
        reverse: true,
        refer: false
      },
      posts: {
        sortBy: 'date',
        reverse: true,
        refer: false
      }
    })
  )
  .use(
    sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules'],
      sourceMap: true,
      sourceMapContents: true,
    })
  )
  .use(
    layouts({
      engine: 'handlebars',
      directory: 'app/layouts',
      partials: 'app/partials'
    })
  )
  .use(
    permalinks({
      pattern: ':title',
      linksets: [{
        match: { collection: 'articles' },
        pattern: 'articles/:date-:title/'
      }, {
        match: { collection: 'posts' },
        pattern: 'posts/:date-:title/'
      }]
    })
  )
  // .use(
  //   assets({
  //     source: './app/assets',
  //     destination: './assets'
  //   })
  // )
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .use(
    watch({
      paths: {
        '${source}/**/*': true,
        'app/layouts/**/*': '**/*',
        'app/partials/**/*': '**/*',
      },
      livereload: true,
    })
  )

/*     *******************    */
/*     plugin chain to        */
/*     manipulate files       */
/*     *******************    */

  .destination('docs')
  .build(function(err) {
    if (err) throw err;
    console.log('Build finished!');
  });
