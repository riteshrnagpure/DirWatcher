'use strict';

const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');

const utilHelper = require('../utils/helper');

class DirectoryWatch extends EventEmitter {
  constructor() {
    super();
  }

  async watchFolder(folder, magicString) {
    try {
      console.log(`Watching folder [${folder}] magicString [${magicString}]`);
      const allFiles = await fsExtra.readdir(folder);
      const addedFiles = [];
      const deletedFiles = [];
      let totalCount = 0;
      const watcher = chokidar.watch(folder, { persistent: true });
      // read all files within directory and count magicString occurance
      for (const file of allFiles) {
        try {
          const fileContents = await fsExtra.readFile(`${folder}/${file}`, 'utf8');
          const currentFileMagicCount = utilHelper.countOccurrences(fileContents, magicString);
          console.log(`Watching folder [${folder}] magic count [${currentFileMagicCount}] for file [${folder}/${file}]`);
          totalCount += currentFileMagicCount;
        } catch (error) {
          console.error(`Watching folder [${folder}] :: error reading file [${folder}/${file}] :: error :: [${JSON.stringify(error)}]`);
        }
      }

      // event to listen any files added in directory
      watcher.on('add', path => {
        console.log(`[${new Date().toLocaleString()}] Watching folder [${folder}] new file added [${path}]`);
        addedFiles.push(addedFiles);
      });

      // event to listen any files getting deleted from directory
      watcher.on('unlink', path => {
        console.log(`[${new Date().toLocaleString()}] Watching folder [${folder}] new file added [${path}]`);
        deletedFiles.push(path);
      });

      return {
        totalCount: totalCount,
        allFiles: allFiles,
        addedFiles: addedFiles,
        deletedFiles: deletedFiles
      }
    } catch (error) {
      console.error(`Watching folder [${folder}] :: error occured during execution :: error :: [${error}]`);
      throw error;
    }
  }
}

module.exports = DirectoryWatch;