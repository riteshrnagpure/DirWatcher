'use strict';

const { constants, fileHelper } = require('../utils');
const DirWatcherService = require('../services/directoryWatch');
const dirWatcherRepo = require('../repositories/dirWatcher.repo');

let configuredDirectory = process.env.DIRECTORY || constants.DEFAULT_CONFIG.DIRECTORY;
let magicString = process.env.MAGIC_STRING || constants.DEFAULT_CONFIG.MAGIC_STRING;
console.log(`dirwatcher.worker :: config directory to read [${configuredDirectory}] :: magicString to check :: [${magicString}]`);

/**
 * @function exectuteJob
 * @description This is scheduler job
 */
const exectuteJob = async() => {
    let transaction = `TR${(new Date()).valueOf()}`;
    try {
        console.log(`executejob :: transaction [${transaction}] started`);
        const dirDetails = {
            transaction: transaction,
            directoryName: configuredDirectory,
            magicString: magicString,
            startTime: new Date(),
            status: constants.EXECUTION_STATUS.INPROGRESS,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await dirWatcherRepo.createTransaction(dirDetails);
        console.log(`executejob :: transaction [${transaction}] inserted successfully in db`);
        // check folder exists or not
        const isDirectoryExists = await fileHelper.isPathExists(configuredDirectory);
        console.log(`executejob :: transaction [${transaction}] is directory exists [${configuredDirectory}] [${isDirectoryExists}]`);
        // if not exists mark job as failed
        if (!isDirectoryExists) {
            const updateDetails = {
                status: constants.EXECUTION_STATUS.FAILED,
                remark: 'directory does not exists',
                endTime: new Date(),
                updatedAt: new Date()
            }
            await dirWatcherRepo.findOneAndUpdate({transaction: transaction}, updateDetails);
            console.log(`executejob :: transaction [${transaction}] end`);
            return;
        }
        // read all files from given directory
        const direWatcher = new DirWatcherService();
        const dirMonitorResult = await direWatcher.watchFolder(configuredDirectory, magicString);
        console.log(`executejob :: transaction [${transaction}] dir monitor result for directory [${configuredDirectory}] is [${JSON.stringify(dirMonitorResult)}]`);
        const updateDetails = {
            magicStringCount: dirMonitorResult.totalCount,
            file: {
                totalFiles: dirMonitorResult.allFiles.length,
                addedFiles: dirMonitorResult.addedFiles,
                deletedFiles: dirMonitorResult.deletedFiles
            },
            endTime: new Date(),
            status: constants.EXECUTION_STATUS.SUCCESS,
            updatedAt: new Date()
        }
        await dirWatcherRepo.findOneAndUpdate({transaction: transaction}, updateDetails);
        console.log(`executejob :: transaction [${transaction}] dir monitor result for directory [${configuredDirectory}] updated in db`);
        console.log(`executejob :: transaction [${transaction}] ended`);
    } catch (error) {
        console.error(`error in running executejob :: error :: [${error}]`);
        const updateFailure = {
            status: constants.EXECUTION_STATUS.FAILED,
            remark: error,
            endTime: new Date(),
            updatedAt: new Date()
        }
        await dirWatcherRepo.findOneAndUpdate({transaction: transaction}, updateFailure);
        console.log(`executejob :: transaction [${transaction}] end`);
        throw error;
    }
};

module.exports = {
    exectuteJob
};
