// const path = require('path');

// module.exports = {
//   entry: './src/index.js', // Entry point for your application
//   output: {
//     filename: 'bundle.js', // Output bundle filename
//     path: path.resolve(__dirname, 'dist'), // Output directory
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/, // Apply the rule to .js files
//         exclude: /node_modules/, // Exclude node_modules
//         use: {
//           loader: 'babel-loader', // Use Babel loader
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets for ES6+ and React
//           },
//         },
//       },
//       {
//         test: /\.css$/, // Apply the rule to .css files
//         use: ['style-loader', 'css-loader'], // Loaders for CSS
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'], // Resolve these extensions
//   },
//   devtool: 'source-map', // Generate source maps for debugging
// };
