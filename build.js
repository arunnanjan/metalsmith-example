/*
 * Pull in Metalsmith and necessary plugins.
 */
var metalsmith = require('metalsmith'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
    sass = require('metalsmith-sass');

/*
 * Start the metalsmith build pipeline.  Give it the current directory to work with.
 */
metalsmith(__dirname)
  /*
   * Setup the site metadata.  More on this later.
   */
  .metadata({
    site: {
      title: 'Metalsmith Awesomeness'
    }
  })
  /*
   * Tell Metalsmith where our site's code lives
   */
  .source('src')
  /*
   * And where to place the build artifacts
   */
  .destination('build')
  /*
   * Generate stylesheets.
   */
  .use(sass({
    outputDir: 'assets/css',
    outputStyle: 'expanded'
  }))
  /*
   * Process our markdown.
   */
  .use(markdown('commonmark', { html: true }))
  /*
   * Add some structure to the generated pages.
   */
  .use(layouts({
    engine: 'pug',
    directory: 'layouts',
    pretty: true
  }))
  /*
   * Finally, magic time.  Build us some internets.
   */
  .build(function(err, files) {
    if (err) { throw err; }
    console.log('Build complete.');
  });
