import process from 'node:process';
import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildTree from './buildTree.js';
import formatDiff from './formatters/index.js';

const buildFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFileData = (filepath) => fs.readFileSync(buildFilePath(filepath), 'utf-8');
const getDataFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(readFileData(filepath1), getDataFormat(filepath1));
  const data2 = parseData(readFileData(filepath2), getDataFormat(filepath2));
  const diffTree = buildTree(data1, data2);

  return formatDiff(diffTree, format);
};

export default genDiff;
