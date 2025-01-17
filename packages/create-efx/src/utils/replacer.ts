import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Find and replace all texts in a single file
 * @param filePath path to file
 * @param oldNames array of strings or single string to find
 * @param newNames array of strings or single string to replace - must equal find
 * @param cwd current working directory
 * @return Promise
 */
const singleReplace = async (filePath: string, oldNames: string[], newNames: string[], cwd: string) => {
  return new Promise<void>((resolve, reject) => {
    const currentFile = path.join(cwd, filePath);

    fs.readFile(currentFile, 'utf8', (error, content) => {
      if (error) {
        reject(error);
        return;
      }

      let fileContent = content;
      newNames.forEach((newName, index) => {
        fileContent = fileContent.replace(new RegExp(oldNames[index], 'g'), newName);
      });

      void Promise.resolve(fileContent).then((out) => {
        fs.writeFile(currentFile, out, 'utf8', (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    });
  });
};

const promises: Promise<void>[] = [];

/**
 * takes a pair of strings or length matched arrays, find and replace
 * @param oldNames array of strings or single string to find
 * @param newNames array of strings or single string to replace - must equal find
 * @param cwd current working directory
 * @return Promise containing number of files changed
 */
const groupReplace = async (oldNames: string[], newNames: string[], cwd: string) => {
  return new Promise(function (resolve, reject) {
    try {
      const files = fg.sync('**/*', { cwd });
      files.forEach(function (file) {
        promises.push(singleReplace(file, oldNames, newNames, cwd));
      });
      void Promise.all(promises).then(function (result) {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  }).then(() => {
    return {
      fileCount: promises.length
    };
  });
};

export default {
  groupReplace,
  singleReplace
};
