import { spawnSync } from "node:child_process"

import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

import { URL } from 'node:url';

import { optionsArray } from '../../data/pandoc-data.mjs';

export { renderUrls }


function renderUrls(docsDir, tocData) {

    // returns an object,
    // key is a bookname
    // value is a string, where each file of book is on a newline
    // this string will be split into an array
    // array will convert filenames into full filepath names 
    // files are then merged into a book representing key name 
    let toc = tocData[docsDir.toc]


    for (const key in toc) {
        const value = toc[key];

        // split the toc string of filepaths into an array of filepaths 
        toc[key] = value
            .replace(/ +/g, "")
            .split(/\n+/)
            .filter(x => x)


        // setup key specific options here
        let inputFileNames = toc[key]


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

            //                    /home/books-dist/ bookname -part1 .  html
            let outputFileName = `${docsDir.outputFolder}/${bookName}-${key}.${docsDir.outputType}`

            // pandoc cmdline
            let listArgs = optionsArray(inputFileNames, docsDir, outputFileName)


            let soxMergeTrackVoices = spawnSync("pandoc", listArgs)
            if (soxMergeTrackVoices.stderr.length !== 0) {
                console.log(`soxMergeTrackVoices:`, `${soxMergeTrackVoices.stderr}`)
            }

        });




    }



}