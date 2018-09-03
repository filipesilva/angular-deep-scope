const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  mode: 'production',
  devtool: 'source-map',
  entry: ['./src/main.js'],
  // Don't show bundle size warnings.
  performance: { hints: false },
  module: {
    rules: [{
      // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
      // Removing this will cause deprecation warnings to appear.
      test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
      parser: { system: true },
    }],
  },
  plugins: [
    // Ignore `Critical dependency: the request of a dependency is an expression` warnings.
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)fesm5/, __dirname),
    new WebpackDeepScopeAnalysisPlugin(),
  ],
  optimization: {
    // Don't minify code.
    minimizer: []
  }
}