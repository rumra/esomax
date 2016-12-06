var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
// var assets = require('metalsmith-assets');
var handlebars = require('handlebars');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var sass = require('metalsmith-sass');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var tags = require('metalsmith-tags');
var excerpts = require('metalsmith-excerpts');
var msIf = require('metalsmith-if');
var prefix = require('metalsmith-prefix');
var inPlace = require('metalsmith-in-place');



var handlebarsLayouts = require('handlebars-layouts');

handlebarsLayouts.register(handlebars);

handlebars.registerHelper('eq', function (arg1, arg2) {
  return arg1 === arg2;
});


var isProductionBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() === 'production');


Metalsmith(__dirname)
  .metadata({
    isProductionBuild: isProductionBuild
  })
  .source('app/src')

  // remove all collections that used
  // issue https://github.com/segmentio/metalsmith-collections/issues/27
  .use((files, metalsmith, done) => {
    metalsmith._metadata.collections = null;
    metalsmith._metadata.articles = null;
    metalsmith._metadata.posts = null;
    metalsmith._metadata.elements = null;
    done();
  })

  .use(
    collections({
      articles: {
        sortBy: 'date',
        reverse: true,
      },
      posts: {
        sortBy: 'date',
        reverse: true,
      },
      elements: {
        sortBy: 'eindex',
        reverse: false,
      }
    })
  )

  .use(inPlace({
    engine: 'handlebars',
    pattern: '**/*.html'
  }))

  .use(excerpts())

  .use(
    permalinks({
      pattern: ':title',
      linksets: [{
        match: { collection: 'articles' },
        pattern: ':collection/:date/:title/'
      }, {
        match: { collection: 'posts' },
        pattern: ':collection/:date/:inUrlName/'
      }]
    })
  )

  .use(
    tags({
      path: 'tags/:tag/index.html',
      layout: 'taggeds.hbs',
    })
  )

  .use(
    layouts({
      engine: 'handlebars',
      directory: 'app/layouts',
      partials: {
        base: '../partials/base',
        skeleton: '../partials/skeleton'
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
    msIf(
      isProductionBuild,
      prefix({
        prefix: 'rastar',
        selector: 'a, img, link, script'
      })
    )
  )

  // .use(
  //   assets({
  //     source: './app/assets',
  //     destination: './assets'
  //   })
  // )

  .use(
    msIf(
      !isProductionBuild,
      watch({
        paths: {
          '${source}/**/*': '**/*',
          'app/layouts/**/*': '**/*',
          'app/partials/**/*': '**/*',
        },
        livereload: true,
      })
    )
  )

  .use(
    msIf(
      !isProductionBuild,
      serve({
        port: 8080,
        verbose: true
      })
    )
  )

  .destination('public')

  .build(function(err) {
    if (err) throw err;
    console.log('Build finished!');
  });
