import { spawnSync } from "node:child_process"

import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import fs from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

import { URL } from 'node:url';

import { optionsArray } from '../../data/pandoc-data.mjs';
import { isObject } from "../docs-list-util.mjs"

export { renderSubFiles }


function renderSubFiles(docsDir) {

    if (isObject(docsDir.inputFiles) === false) { throw new Error("inputFiles must be an object.") }

    let toc = docsDir.inputFiles

    // these contain options in the pandoc cmdline
    let bookName = docsDir.outputFileName

    for (const key in toc) {
        const value = toc[key];

        // split the toc string of filepaths into an array of filepaths 
        toc[key] = value
            .replace(/ +/g, "")
            .split(/\n+/)
            .filter(x => x)
            // create fullpath here
            .map(filepath => path.join(docsDir.inputFolder, filepath))

        // filters out non-existent filepaths
        toc[key] = toc[key].filter(filepath => {
            let filePathExists = fs.existsSync(filepath)
            if (filePathExists === false) { console.warn(`File "${filepath}" not found. No output.`) }
            return filePathExists
        })


        // setup key specific options here
        let inputFileNames = toc[key]
        //                    /home/books-dist/ bookname -part1 .  html
        let outputFileName = `${docsDir.outputFolder}/${bookName}-${key}.${docsDir.outputType}`

        // pandoc cmdline
        let listArgs = optionsArray(inputFileNames, docsDir, outputFileName)


        let soxMergeTrackVoices = spawnSync("pandoc", listArgs)
        if (soxMergeTrackVoices.stderr.length !== 0) {
            console.log(`soxMergeTrackVoices:`, `${soxMergeTrackVoices.stderr}`)
        }


    }

    // sdfg.filter(x => x.length > 0)


    // console.log("toc:", toc)
    // throw new Error("dfsg")


}

