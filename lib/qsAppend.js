const cheerio = require('cheerio');

class QsAppend {
    constructor( file ) {
        this.currentTime = Date.now();
        if( typeof file === 'string' ) {
            this.fileContents = file;
        } else {
            this.fileContents = file.contents;
        }
        this.$ = cheerio.load(this.fileContents);
    }

    getAttr( obj ) {
        return this.$(obj).attr(this.getAttrName(obj));
    }

    getAttrName( obj ) {
        let clone = this.$(obj);

        if( !clone.is('link') ) {
            return 'src';
        }

        return 'href';
    }

    appendRequiredFor( obj ) {
        return (!this.getAttr(obj).startsWith('http') && !this.getAttr(obj).startsWith('//'));
    }

    getQsSeperator( obj ) {
        const attr = this.getAttr(obj);
        const questionMarkPos = this.getAttr(obj).indexOf('?');

        if( questionMarkPos + 1 === attr.length ) {
            return '';
        } else if( questionMarkPos > -1 ) {
            return `&`;
        }

        return '?';
    }

    append( obj ) {
        this.$(obj).attr( this.getAttrName(obj), this.getAttr(obj) + this.getQsSeperator(obj) + this.currentTime );
    }

    getAppendedFileContents() {
        let foundObjects = this.$('img[src], link[rel=stylesheet][href], source[src], script[src]');
        foundObjects.each( (i, obj) => {
            if( this.appendRequiredFor(obj) ) {
                this.append(obj);
            }
        });
        return this.$.html({ decodeEntities: false });
    }

    getAppendedFileContentsAsBuffer(encoding) {
        return Buffer.from(this.getAppendedFileContents(), encoding);
    }
}

module.exports = QsAppend;
