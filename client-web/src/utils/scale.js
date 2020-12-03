/**
 * scales a number between an input and output range
 * @param {Number} value - number to scale
 * @param {Array<Number>} r1 - min, max input rage
 * @param {Array<Number>} r2 - min, max output range
 */

export const scale = ( value, r1, r2 ) => { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}