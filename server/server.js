'use strict';

const express = require('express');
const cron = require('node-cron');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connectionHelper = require('./utils/connection');

const servcieRouter = require('./routes/v1/dirWatcherApi');
const { constants } = require('./utils');
const directoryWatchJob = require('./workers/dirWatcher.worker');

process.env.SCHEDULER_TIME = process.env.SCHEDULER_TIME || constants.DEFAULT_CONFIG.SCHEDULER_TIME;

const schedulerTime = process.env.SCHEDULER_TIME;

app.use(`${constants.BASE_URL}/v1/service`, servcieRouter);

let task = cron.schedule(`*/${schedulerTime} * * * *`, async() => {
    try {
        await directoryWatchJob.exectuteJob();
        console.log(`scheduler job executed successfully`);
    } catch (error) {
        console.error(`error executing scheduler job :: error :: [${JSON.stringify(error)}]`);
    }
});

// TODO :: Move this code to routes folder 
//! Adding start-stop API becuase of global task variable
app.get(`${constants.BASE_URL}/start-stop-scheduler`, (req, res) => {
    if(schedulerTime == req.query.rotationInMinute) {
        res.send({message: `schedule is already same : ${req.query.rotationInMinute}`});
        return;
    }
    task.destroy();
    console.log(`running a task in the interval: "*/${req.query.rotationInMinute} * * * *"`);
    task = cron.schedule(`*/${req.query.rotationInMinute} * * * *`, () => {
        directoryWatchJob.exectuteJob()
    });
    res.send({message: `updating the cron timing : ${req.query.rotationInMinute}`});
});

app.listen(constants.PORT, '0.0.0.0', () => {
    console.log(`Server is listening on [http://0.0.0.0:${constants.PORT}]`);
    connectionHelper.init().then(() => {
        console.log("All connection established successfully");
    }).catch(error => {
        console.error(`Error in connection established :: [${JSON.stringify(error)}]`);
        process.exit();
    });
});

process.on('unhandledRejection', (reason, promise) => {
    // application specific logging, throwing an error, or other logic here
    console.log(`Unhandled rejection at promise [${JSON.stringify(promise)}] :: reason :: [${JSON.stringify(reason)}]`);
});

process.on('uncaughtException', (err) => {
    console.error(`Caught exception:: [${err.stack}]`);
});
