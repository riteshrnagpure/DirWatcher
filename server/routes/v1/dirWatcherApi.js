'use strict';

const express = require('express');
const router = express.Router();

const dirWatcherController = require('../../controllers/dirWatcher.controller');

// route for specific details of transactions
router.get('/info/:transaction', (req, res, next) => {
    dirWatcherController.getInfo(req, res);
});

// route for getting all transactions
router.get('/transactions', (req, res, next) => {
    dirWatcherController.getAllTransactions(req, res);
});

// route for configured any details
router.post('/changeConfig', (req, res, next) => {
    dirWatcherController.changeConfig(req, res);
});

module.exports = router;