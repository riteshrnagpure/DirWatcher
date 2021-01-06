'use strict';

const PORT = 8080;
const BASE_URL = '/dir-watcher';

const ERROR_CODES = {
    INTERNAL_SERVER_ERROR: 500,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
};

const DEFAULT_CONFIG = {
    DIRECTORY: 'default',
    MAGIC_STRING: 'magic',
    SCHEDULER_TIME: 1
};

const EXECUTION_STATUS = {
    SUCCESS: 'success',
    FAILED: 'failed',
    INPROGRESS: 'inprogress'
}

module.exports = {
    PORT,
    ERROR_CODES,
    BASE_URL,
    DEFAULT_CONFIG,
    EXECUTION_STATUS
};