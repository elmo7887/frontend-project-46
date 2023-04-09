import fs from 'fs'
import path from 'path'
import {expect, test} from '@jest/globals'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getPathToFixturesFiles = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFileData = (filename) => fs.readFileSync(getPathToFixturesFiles(filename), 'utf-8')

const testFormats = ['json', 'yaml']

test.each(testFormats)('Get difference of two %s files', (format) => {
    const path1 = getPathToFixturesFiles(`file1.${format}`)
    const path2 = getPathToFixturesFiles(`file2.${format}`)
    expect(genDiff(path1, path2)).toBe(readFileData('stylish.txt'))
    expect(genDiff(path1, path2, 'stylish')).toBe(readFileData('stylish.txt'))
    expect(genDiff(path1, path2, 'plain')).toBe(readFileData('plain.txt'))
    expect(genDiff(path1, path2, 'json')).toBe(readFileData('json.txt'))
    expect(() => JSON.parse(genDiff(path1, path2, 'json'))).not.toThrow()
})