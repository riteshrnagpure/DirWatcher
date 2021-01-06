'use strict';

const fsExtra = require('fs-extra');

/**
 * @function isPathExists
 * @param {*} path 
 * @returns {Boolean}
 */
const isPathExists = async (path) => {
    return await fsExtra.pathExists(path);
};

module.exports = {
    isPathExists
}