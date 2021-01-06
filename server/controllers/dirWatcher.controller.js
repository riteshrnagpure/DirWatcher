'use strict';

const _ = require('lodash');

const { constants } = require('../utils');
const dirWatcherRepo = require('../repositories/dirWatcher.repo');

/**
 * @function getInfo dirwatcher.controller.getInfo
 * @param {*} req 
 * @param {*} res 
 * @description This controller will send all details wrt given transaction
 */
const getInfo = async (req, res) => {
    try {
        const transaction = req.params.transaction;
        console.log(`dirwatcher.controller.getInfo :: transaction received [${transaction}]`);
        const transactionDetails = await dirWatcherRepo.getServiceByTransaction(transaction);
        // if record not found in db
        if (!transactionDetails) {
            console.log(`dirwatcher.controller.getInfo :: transaction [${transaction}] not present in db`);
            return res.status(constants.ERROR_CODES.BAD_REQUEST).send({ message: 'Invalid transaction id'});
        }
        const response = {
            transaction: transactionDetails.transaction,
            startTime: transactionDetails.startTime,
            endTime: transactionDetails.endTime,
            totalRunTime: ((new Date(transactionDetails.endTime).getTime() - new Date(transactionDetails.startTime).getTime())/ 1000),
            magicStringCount: transactionDetails.magicStringCount,
            status: transactionDetails.status,
            addedFiles: transactionDetails.addedFiles || [],
            deletedFiles: transactionDetails.deletedFiles || []
        };
        return res.send(response);
    } catch (error) {
        console.error(`error dirwatcher.controller.getInfo :: error :: [${error}]`);
        return res.status(constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({ message: 'something went wrong'});
    }
};

/**
 * @function getInfo dirwatcher.controller.getAllTransactions
 * @param {*} req 
 * @param {*} res 
 * @description This controller will all transactions info
 */
const getAllTransactions = async(req, res) => {
    try {
        const allTransactions = await dirWatcherRepo.getAllTransactions();
        console.log(`dirwatcher.controller.getAllTransacation :: total transactions found :: [${allTransactions.length}]`);
        const response = _.map(allTransactions, (record) => {
            return {
                transaction: record.transaction,
                startTime: record.startTime
            }
        });
        return res.send(response);
    } catch (error) {
        console.error(`error dirwatcher.controller.getAllTransactions :: error :: [${error}]`);
        return res.status(constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({ message: 'something went wrong'});   
    }
};

/**
 * @function getInfo dirwatcher.controller.changeConfig
 * @param {*} req 
 * @param {*} res 
 * @description This controller will update the configured directory, magicstring and schedular time.
 */
const changeConfig = async(req, res) => {
    try {
        const body = req.body;
        const directory = _.get(body, 'directory');
        const schedulerTime = _.get(body, 'schedulerTime');
        const magicString = _.get(body, 'magicString');
        if (directory) {
            process.env.DIRECTORY = directory;
        }
        if (schedulerTime) {
            process.env.SCHEDULER_TIME = schedulerTime;
        }
        if (magicString) {
            process.env.MAGIC_STRING = magicString;
        }
        console.log(`dirwatcher.controller.changeConfig :: config successfully updated`);
        return res.send()
    } catch (error) {
        console.error(`error dirwatcher.controller.changeConfig :: error :: [${error}]`);
        return res.status(constants.ERROR_CODES.INTERNAL_SERVER_ERROR).send({ message: 'something went wrong'});
    }
};

module.exports = {
    getInfo,
    getAllTransactions,
    changeConfig
};
