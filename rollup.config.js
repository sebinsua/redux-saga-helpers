import babel from 'rollup-plugin-babel'
import camelCase from 'camelcase'

const pkg = require('./package.json')

export default {
  entry: pkg.entry || 'src/index.js',
  exports: 'named',
  plugins: [
    babel({
      'runtimeHelpers': true,
      'plugins': [ 'transform-runtime', 'external-helpers' ],
      'presets': [
        [ 'es2015', { 'modules': false } ],
        [ 'stage-2' ]
      ],
      'babelrc': false
    })
  ],
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
