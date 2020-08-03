### British Isles Grid Reference library
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
For details of the API, view the [JSDoc API documentation](https://github.com/BiologicalRecordsCentre/brc-atlas-bigr/tree/master/out/).

There are also a number of [working examples](https://biologicalrecordscentre.github.io/brc-atlas-bigr/).