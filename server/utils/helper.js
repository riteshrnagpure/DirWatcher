'use strict';

/**
 * @function countOccurrences
 * @param {*} string 
 * @param {*} subString 
 * @returns {count}
 * @description This will return count of occurences in given string
 */
const countOccurrences = (string, subString) =>{
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    let count = 0, pos = 0, step = subString.length;
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++count;
            pos += step;
        } else break;
    }
    return count;
};

module.exports = {
    countOccurrences
}

