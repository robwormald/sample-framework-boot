const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonJS = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
console.log('runnin...')
const writeIIFE = fileName => bundle => bundle.write({format: 'iife', dest: fileName, moduleName: 'app'});

function patchHack(){
  return {
    transformBundle(src){

      const patch = `Reflect.getOwnMetadata = function(){};`


      return patch + src;
    }
  }
}

//rollup plugins
var plugins = [
	nodeResolve({ module: true }),
  commonJS(),
  patchHack(),
  uglify(),

]

rollup.rollup({
	entry: 'src/angular/lib/main.js',
	plugins: plugins,
  context: 'window'
})
.then(bundle => {
  return bundle.write({
    format: 'iife',
    moduleName: 'app',
    dest: 'dist/angular/app.js'
  })
})
.catch(err => console.log(err));
