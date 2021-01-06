'use strict';

const mongoose = require("mongoose");

/**
 * Creating schema for dirWatcher model
 */
const dirWatcherSchema = new mongoose.Schema({
    transaction: {
        type: String
    },
    directoryName: {
        type: String
    },
    magicString: {
        type: String
    },
    magicStringCount: {
        type: Number
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status: {
        type: String
    },
    remark: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    file: {
        type: Object,
        totalFiles: {
            type: Number
        },
        addedFiles: {
            type: [String]
        },
        deletedFiles: {
            type: [String]
        }
    }
});

const DirWatcher = mongoose.model("DirWatcher", dirWatcherSchema);

module.exports = DirWatcher;
