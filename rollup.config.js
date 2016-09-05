import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import camelCase from 'camelcase'

const pkg = require('./package.json')

export default {
  entry: pkg.entry || 'src/index.js',
  plugins: [ babel(Object.assign({ runtimeHelpers: true }, babelrc())) ],
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: camelCase(pkg.name),
      sourceMap: true
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es',
      sourceMap: true
    }
  ]
}
