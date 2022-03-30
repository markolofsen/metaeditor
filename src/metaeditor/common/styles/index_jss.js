import * as React from 'react';

import styled_ from 'styled-jss'

// colors
import {
    blue as primary,
    lime as secondary,
    green as success,
} from './colors/';


// const styled = (obj, cb) => styled_(obj)(({ theme }) => cb(theme))

/* Usage styled:
import {styled} from 'styles/snippets'

const RootList = styled.ul(theme => ({
  backgroundColor: 'red',
}))
*/

const custom = new class {
    constructor() { }

    makeRadius(...payload) {
        const radius = 10
        let res = []
        for (let i of payload) {
            if (i === 'auto') i = radius
            res.push(i)
        }
        if (res.length > 0) { return res.map(item => item + 'px').join(' '); }
        return radius;
    }

}

const media = new class {

    /*
    Usage in css:
  
    root: {
      [media.down.sm]: {
        height: 28,
      },
    },
    */

    constructor() {
        this.min = (int) => `@media (min-width: ${int}px)`
        this.max = (int) => `@media (max-width: ${int}px)`
    }

    // {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536}

    get down() {
        return {
            xs: this.max(600),
            sm: this.max(900),
            md: this.max(1200),
            lg: this.max(1536),
            // xl: this.max(1536),
        };
    }
    get up() {
        return {
            xs: this.min(0),
            sm: this.min(600),
            md: this.min(900),
            lg: this.min(1200),
            xl: this.max(1536),
        };
    }
}


const theme = new class {
    constructor() {
        this.media = media
        this.custom = custom
    }

    spacing(...args) {
        const _size = .5
        return args.map(i => {
            if (typeof i === 'number') {
                return `${i * _size}rem`
            }
            return i

        }).join(' ')

    }
    get palette() {
        return {
            background: {
                // default: 'var(--ifm-color-emphasis-100)',
                // paper: 'var(--ifm-color-emphasis-0)',
            },
            primary: {
                ...primary,
                main: primary[500],
            },
            secondary: {
                ...secondary,
                main: secondary[500],
            },
            success: {
                ...success,
                main: success[500],
            },
        }
    }
    get typography() {
        const getFontSize = s => {
            let mobileSize = s * .8
            mobileSize = mobileSize < 1 ? 1 : mobileSize

            return {
                [media.down.md]: {
                    fontSize: `${mobileSize}rem`,
                },
                [media.up.md]: {
                    fontSize: `${s}rem`,
                },
            }
        }

        const hTag = (s) => {
            const fontWeight = s * (100 * 2.3)
            return {

                fontWeight: fontWeight > 500 ? fontWeight : 500,
                ...getFontSize(s),
            }
        }
        const pTag = (s) => {
            return {
                ...getFontSize(s),
            }
        }

        return {
            h1: hTag(4),
            h2: hTag(3),
            h3: hTag(2.3),
            h4: hTag(2),
            h5: hTag(1.3),
            h6: hTag(1.2),
            body1: pTag(1.1),
            body2: pTag(.9),
            subtitle1: {},
            subtitle2: {},
            caption: {},
            fontWeightBold: 700,
        }
    }
}

const styled = new class {
    constructor() {
        this.styled = (obj, cb) => {
            return styled_(obj)(cb(theme))
        }
    }
    ul(cb) { return this.styled('ul', cb); }
    ol(cb) { return this.styled('ol', cb); }
    div(cb) { return this.styled('div', cb); }

    custom(obj, cb) { return this.styled(obj, cb); }
}

export {
    custom,
    media,
    theme,
    styled,
}

export default undefined