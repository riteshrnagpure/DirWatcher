'use strict';

const DirWatcher = require('../models/DirWatcher.model');

/**
 * @function getServiceByTransaction
 * @param {@} transaction 
 * @returns {object}
 */
const getServiceByTransaction = async(transaction) => {
    return await DirWatcher.findOne({transaction: transaction});
};

/**
 * @function getAllTransactions
 * @returns {Array}
 */
const getAllTransactions = async() => {
    return await DirWatcher.find({}, {transaction: true, startTime: true});
};

/**
 * @function createTransaction
 * @param {@} dirDetails
 * @returns {object}
 */
const createTransaction = async(dirDetails) => {
    const dirWatcher = new DirWatcher(dirDetails);
    return await dirWatcher.save();
};

/**
 * @function findOneAndUpdate
 * @param {@} filter
 * @param {@} update
 * @returns {object}
 */
const findOneAndUpdate = async(filter, update) => {
    return await DirWatcher.findOneAndUpdate(filter, update);
};

module.exports = {
    getServiceByTransaction,
    getAllTransactions,
    createTransaction,
    findOneAndUpdate
}