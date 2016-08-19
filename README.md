[![Build Status](https://travis-ci.org/Microsoft/PowerBI-extensibility-text-utility.svg?branch=master)](https://travis-ci.org/Microsoft/PowerBI-extensibility-text-utility)
[![Build status](https://ci.appveyor.com/api/projects/status/cvvwogwq4lclrgh5/branch/master?svg=true)](https://ci.appveyor.com/project/spatney/powerbi-extensibility-text-utility)
# Text utility
A utility for doing speedy text measurement, and trimming text.

### Usage (using textUtility.ts in your projects)

```
let props = { text: 'Some text to measure', fontFamily: 'sans-serif', fontSize: '20px' };
let length = TextUtility.measureTextWidth(props);
```

### Development (build + test for contirbuting to this library)

```
npm install
npm test
```