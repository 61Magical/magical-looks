import { hash } from './core/hash';
import { compile } from './core/compile';
import { getSheet } from './core/get-sheet';
import { styled } from './styled';
/**
 * css entry
 * @param {String|Object|Function} val
 */
function css ( val )
{
    let ctx = this || {};
    let _val = val.call ? val( ctx.p ) : val;

    return hash(
        _val.unshift
            ? _val.raw
                ? // Tagged templates
                compile( _val, [].slice.call( arguments, 1 ), ctx.p )
                : // Regular arrays
                _val.reduce( ( o, i ) => Object.assign( o, i && i.call ? i( ctx.p ) : i ), {} )
            : _val,
        getSheet( ctx.target ),
        ctx.g,
        ctx.o,
        ctx.k
    );
}

/**
 * Creates the global styles component to be used as part of your tree.
 * @returns {Function}
 */
function createGlobalLooks ()
{
    const fn = styled.call( { g: 1 }, 'div' ).apply( null, arguments );

    /**
     * This is the actual component that gets rendered.
     */
    return function GlobalStyles ( props )
    {
        // Call the above styled.
        fn( props );

        // Returns a hole.
        return null;
    };
}

/**
 * `keyframes` function for defining animations
 * @type {Function}
 */
let keyframes = css.bind( { k: 1 } );

export { css, createGlobalLooks, keyframes };
