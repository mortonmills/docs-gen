import { spawnSync } from "node:child_process"

import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

import { URL } from 'node:url';

import { optionsArray } from '../../data/pandoc-data.mjs';
import { isObject, pandocRender } from "../docs-list-util.mjs"
export { renderFullFiles, genInputFileNames }


function renderFullFiles(docsDir) {

    // will prioritize using inputFiles before toc, if both are present
    let inputFileNames = genInputFileNames(docsDir)


    if (docsDir.inputStructure === "filesfiles") { renderFilesFiles() }
    else if (docsDir.inputStructure === "fullfiles") { renderFilesFiles() }

    //                    /home/books-dist/ bookname.  html
    let outputFileName = `${docsDir.outputFolder}/${docsDir.outputFileName}.${docsDir.outputType}`

    // pandoc cmdline
    let listArgs = optionsArray(inputFileNames, docsDir, outputFileName)

    pandocRender(listArgs)

}


function genInputFileNames(docsDir) {


    let inputFileNames;

    if (Array.isArray(docsDir.inputFiles)) {

        // convert strings of filepaths into arrays 
        inputFileNames = docsDir.inputFiles.map(fileStrings => {
            return fileStrings
                .replace(/ +/g, "")
                .split(/\n+/)
                .filter(x => x)
                // create fullpath here, if inputFolder is present, join both as fullpath
                .map(filepath => path.join(docsDir.inputFolder ? (docsDir.inputFolder, filepath) : filepath))
        })

    }
    else if (isObject(docsDir.inputFiles)) {

        let toc = docsDir.inputFiles
        inputFileNames = []
        for (const key in toc) {
            const value = toc[key];

            // split the toc string of filepaths into an array of filepaths 
            toc[key] = value
                .replace(/ +/g, "")
                .split(/\n+/)
                .filter(x => x)

            inputFileNames.push(toc[key])
        }

    }


    // convert array of arrays to one array
    inputFileNames = inputFileNames.flat()


    return inputFileNames

}




function renderFilesFiles(docsDir) {

    inputFileNames.forEach(fileName => {

        let testurl = new URL(`${fileName}`)
        let pathName = testurl.pathname
        // let parsedPath = path.parse(pathName)
        let bookName = pathName.split("/").filter(el => el)
        let nameIndex = bookName.length
        bookName =
            bookName[nameIndex - 2]
                ? bookName[nameIndex - 2] + "-" + bookName[nameIndex - 1]
                : bookName[nameIndex - 1]
                    .join("-")

        //                    /home/books-dist/ bookname.  html
        let outputFileName = `${docsDir.outputFolder}/${bookName}.${docsDir.outputType}`

        // pandoc cmdline
        let listArgs = optionsArray(fileName, docsDir, outputFileName)

        pandocRender(listArgs)

    });

}