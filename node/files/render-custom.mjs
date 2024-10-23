import { spawnSync } from "node:child_process"

import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

import { URL } from 'node:url';

import { optionsArray } from '../../data/pandoc-data.mjs';

export { renderCustom }


function renderCustom(docsDir, docsDirContents, tocData) {

    // returns all files in the book folder
    let docsDirFiles = docsDirContents.filter(content => content.isFile())


    // returns an object,
    // key is a bookname
    // value is a string, where each file of book is on a newline
    // this string will be split into an array
    // array will convert filenames into full filepath names 
    // files are then merged into a book representing key name 
    let toc = tocData[docsDir.toc]

    // these contain options in the pandoc cmdline
    let bookName = docsDir.outputFileName

    for (const key in toc) {
        const value = toc[key];

        // split the toc string of filepaths into an array of filepaths 
        toc[key] = value
            .replace(/ +/g, "")
            .split(/\n+/)
            .filter(x => x)
        // .map(filepath => path.join(DOCUMENTS, docsDir.bookPath, filepath))



        // ensures documents dir has the dir in book list
        // important to make sure book list and document dir both have same books available  

        // important, it is possible for there to be multiple paths with same name as file path given in custom 
        // make sure custom paths are unique or there may be missing or unintended output of files
        // "src/code" is better than "code" as there could be multiple files named code

        // goes through each filepath
        toc[key] = toc[key].map(filepath => {
            // return the bookFile that has that filepath
            // "/home/dir/somefolder/file.md" has "file.md" or better is "somefolder/file.md"
            // the "find method" will return undefined if not found
            let newBookFile = docsDirFiles.find(bookFile => bookFile.fullPath.includes(filepath))

            if (newBookFile === undefined) { console.warn(`File "${filepath}" not found. No output.`) }
            // return bookFile's fullpath for toc value, undefined if not available
            return newBookFile?.fullPath

            // return docsDirFiles.some(bookFile => bookFile.fullPath.search(filepath))
        })

        // filters out any undefined values from the last conversion
        toc[key] = toc[key].filter(filepath => filepath)


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

