/**
 * Check if an object is empty - true if is empty, false if not
 * @param {Object} obj to check
 */

export const isEmpty = ( obj ) =>{
    for(var i in obj) return false; 
    return true;  
}