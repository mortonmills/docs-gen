
import { readdirSync, mkdirSync, existsSync } from 'node:fs';

import path from 'node:path';

import { docsListPrep } from "./node/docs-list-prep.mjs"

import { renderFullDir } from "./node/folder/render-full-dir.mjs"
import { renderSubDir } from "./node/folder/render-sub-dir.mjs"
import { renderFilesDir } from "./node/folder/render-files-dir.mjs"

import { renderSubFiles } from "./node/files/render-sub-files.mjs"
import { renderFullFiles } from "./node/files/render-full-files``.mjs"
import { renderFilesFiles } from "./node/files/render-files-files.mjs"

export { docsGen }

// node api
//     os freemem totalmem homedir userinfo tmpdir
//     path use dirname
//     process.env memusage resource usage and uptime
//     fs.glob mkdir.recursive readdir realpath 
//         remove.recursive watch save process create write stream and stat 


// docsList will be an array of objects with options
// the toc is only use for files type inputStructure
function docsGen(docsList, tocData) {

    docsList = docsListPrep(docsList)

    // this is for gathering the tocData not used in main function
    // showDirFilesList(docsList)


    // next stage is to render according to options in docsList docsDir
    for (const docsDir of docsList) {

        let options = {
            // creates dirEnt from node readDirSync
            withFileTypes: true,
            // set with the docsList options array  
            recursive: docsDir.recursive,
        }

        // renders files from multiple sources, skips bottom section since inputFolders are used
        if (docsDir.inputStructure === "fullfiles") { renderFullFiles(docsDir, tocData); continue }
        else if (docsDir.inputStructure === "subfiles") { renderSubFiles(docsDir, tocData); continue }
        else if (docsDir.inputStructure === "filesfiles") { renderFilesFiles(docsDir, tocData); continue }

        // gets all contents in current dir
        let docsDirContents = readdirSync(docsDir.inputFolder, options)
        // sets up full paths, needed for generating file and dir books 
        docsDirContents.forEach(file => file.fullPath = path.join(file.parentPath, file.name))

        // render entire directory as Book
        if (docsDir.inputStructure === "fulldir") { renderFullDir(docsDir, docsDirContents) }
        // for book per sub dir
        else if (docsDir.inputStructure === "subdir") { renderSubDir(docsDir, docsDirContents) }
        // renders a book for each file in the docsDir
        else if (docsDir.inputStructure === "filesdir") { renderFilesDir(docsDir, docsDirContents) }
    }


}