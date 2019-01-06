# gulp-qs-append

> Querystring append plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage
First, install `gulp-qs-append` as a development dependency:
```sh
npm install --save-dev gulp-qs-append

yarn add --dev gulp-qs-append
```

Then, add it to your `gulpfile.js`:
```js
const qsAppend = require('gulp-qs-append');

gulp.src('./dist/*/*.html')
	.pipe(qsAppend())
	.pipe(gulp.dest('./dist'));
```


## License

Licensed under the MIT license.
