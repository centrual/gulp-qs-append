const chai = require('chai');
const assert = chai.assert;
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const QsAppend = require('../lib/qsAppend');

describe('gulp-qs-append', function() {
    it('should append querystring to asset urls', async () => {
        const isValid = /^(?!https?:\/\/|\/\/).+[?&][0-9]{13}$/;

        const file = fs.readFileSync(path.join(__dirname, 'fake.html'), {encoding: 'utf8'});
        const append = new QsAppend(file);
        const result = append.getAppendedFileContents();

        let isPathsValid = true;

        const $ = cheerio.load(result);

        $('img[src], link[rel=stylesheet][href], source[src], script[src]').each( (i, obj) => {
            const $obj = $(obj);
            let url = '';

            if( $obj.is('link') ) {
                url = $obj.attr('href');
            } else {
                url = $obj.attr('src');
            }

            if( !url.startsWith('http') && !url.startsWith('//') && !isValid.test(url) ) {
                isPathsValid = false;
            }
        });

        assert.equal(isPathsValid, true);
    });
});
