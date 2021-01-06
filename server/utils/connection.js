'use strict';

const mongoose = require("mongoose");

// TODO : Read all connection URL config based using config module
const mongoURL = "mongodb://mongo:27017/mongo-test";

/**
 * @function connectMongo
 * @description This will help to connect mongoDB through mongoose
 */
const connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoURL)
    .then(() => {
      console.log(`mongo connection successful`);
      return resolve();
    })
    .catch((error) => {
      console.error(`error connecting to mongo :: error :: [${JSON.stringify(error)}]`);
      return reject(error);
    });
  });
};

/**
 * @function init
 * @description This will be central initializing method to make all connection requires by app
 */
const init = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      connectMongo()
    ]).then(() => {
      return resolve();
    }).catch((error) => {
      console.error(`Error initializing connection :: error :: [${JSON.stringify(error)}]`);
      return reject();
    });
  });
};

module.exports = {
  init
};