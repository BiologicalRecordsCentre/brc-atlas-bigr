# British Isles Grid Reference library
The British Isles Grid Reference (bigr) library is a Javascript library for
working with British, Irish or Channel Island grid references. 

British grid references are those associated with reference system
known as 'OSGB 1936 / British National Grid' (epsg:27700). Irish grid references are
those associated with the reference sytem known as 'TM75 / Irish Grid' (epsg:29903).
Channel Island grid references are derived from the UTM grid - 'WGS 84 / UTM zone 30N'
using a shorthand method whereby the leading '30U' prefix is removed. This gives
grid references for the Channel Islands with prefixes of 'WA' or 'WV'.

## Installing
The bigr library is an [NPM package](https://www.npmjs.com/package/brc-atlas-bigr) and
can be installed with NPM in the usual way, e.g:
```
npm install brc-atlas-bigr
```
Alternatively you can get the javscript builds from 
the [GitHub repo](https://github.com/BiologicalRecordsCentre/brc-atlas-bigr/tree/master/dist)
or include them in code directly from a CDN, e.g:
```
<script src="https://unpkg.com/brc-atlas-bigr/dist/bigr.min.umd.js"></script>
```

## API documentation and code examples
For details of the API, view the [JSDoc API documentation](https://biologicalrecordscentre.github.io/brc-atlas-bigr/api/).

There are also a number of [working examples](https://biologicalrecordscentre.github.io/brc-atlas-bigr/).

## Notes for developers
### Assets
There are a number of geojson files in the `dist/assets` folder. These are used, for example, by the `pntToArea` function.
### Documentation
The package uses JSDoc to produce the API documentation. JSDoc is not included in the package dependendies since developers normally install it globally in their development environment.
### Utility scripts
There are a couple of utility scripts in the `scripts` folder for manipulating geojson files. I developed these when I was developing the geojson assets. They are commented inline.
### Typical build & publish workflow
- Upate version in `package.json`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run docs`
- `npm login` (if publishing to Node)
- `npm publish` (if publishing to Node)
- Git commit all changes
- `git push`

Because this is a published Node package the CDN https://unpkg.com/brc-atlas-bigr@version/dist/bigr.min.umd.js is automatically maintained with 'version' being replaced by the npm package version number when published.
### Rollup
Rollup is used to build the transpiled library javascript assets for this package. Rollup is often preferred over webpack or other bundling tools for packaging libraries. The following javascript assets are produced by this rollup configuration:

- **bigr.cjs.js**: CommonJS format package that Node projects can use. 
- **bigr.esm.js**: an ES module formatted output JS file. Can be used in recent versions of node or in modern browsers. 
- **bigr.umd.js**: this is the browser-friendly package which can be used from browsers (supports a couple of different export formats). 
- **bigr.umd.min.js**: same as previous but minified.

The following rollup plugins are used in the build:

- **@rollup/plugin-node-resolve**: this allows rollup to resolve references to node libraries (in node_modules).
- **@rollup/plugin-commonjs**: this allows rollup to convert CommonJS modules to ES6.
- **@rollup/plugin-babel**: this is what allows rollup to transpile ES6/7 code to ES5 (for the browser packaging). This plugin has dependencies on '@babel/core' and '@babel/preset-env' which are included in the project's node package.
- **rollup-plugin-terser**: this is used to produce the minified file.
- **rollup-plugin-eslint**: this enables linting to be carried out as part of the packaging (not absolutely necessary since linting an be done on an ongoing basis and also added as an npm script).

### Other files in project
The following files are in the root folder: 

- **_config.yml**: used by GitHub pages to configure github pages 
- **.eslintrc.json**: configures ESLint. These some stuff in here that's necessary to get jest and eslint to play nicely together. 
- **babel.config.js**: the configuration in here seems to necessary to get Jest to work properly with ES2015 modules. 
- **rollup.config.js** - rollup configuration. 

