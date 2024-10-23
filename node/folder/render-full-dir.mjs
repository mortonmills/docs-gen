import { spawnSync } from "node:child_process"

import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

import { URL } from 'node:url';

import { tocData } from '../../data/toc-data.mjs';
import { optionsArray } from '../../data/pandoc-data.mjs';

export { renderFullDir }


function renderFullDir(docsDir, docsDirContents) {

    // returns all files in the book folder
    let docsDirFiles = docsDirContents
        .filter(content =>
            content.isFile()
            && docsDir.inputType.includes(path.extname(content.name)))



    let bookArr = docsDirFiles.map(file => file.fullPath)
    let bookName = docsDir.outputFileName
    // setup key specific options here
    let inputFileNames = bookArr
    let outputFileName = `${docsDir.outputFolder}/${bookName}.${docsDir.outputType}`

    // pandoc cmdline
    let listArgs = optionsArray(inputFileNames, docsDir, outputFileName)


    let soxMergeTrackVoices = spawnSync("pandoc", listArgs)
    if (soxMergeTrackVoices.stderr.length !== 0) {
        console.log(`soxMergeTrackVoices:`, `${soxMergeTrackVoices.stderr}`)
    }


    // throw new Error("dfsg")

}