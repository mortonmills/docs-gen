
import { readdirSync, mkdirSync, existsSync } from 'node:fs';

import path from 'node:path';

import { docsListPrep } from "./node/docs-list-prep.mjs"

import { renderFullDir } from "./node/folder/render-full-dir.mjs"
import { renderSubDir } from "./node/folder/render-sub-dir.mjs"
import { renderFiles } from "./node/folder/render-files.mjs"

import { renderCustom } from "./node/files/render-custom.mjs"
import { renderCustomUrls } from "./node/files/render-custom-urls.mjs"
import { renderUrls } from "./node/files/render-urls.mjs"

export { docsGen }

// node api
//     os freemem totalmem homedir userinfo tmpdir
//     path use dirname
//     process.env memusage resource usage and uptime
//     fs.glob mkdir.recursive readdir realpath 
//         remove.recursive watch save process create write stream and stat 


// docsList willbe an array of objects with options
// the toc is only required for custom and urls inputStructure
function docsGen(docsList, tocData) {

    docsList = docsListPrep(docsList)

    // next stage is to render according to options in docsList docsDir
    for (const docsDir of docsList) {

        let options = {
            // creates dirEnt from node readDirSync
            withFileTypes: true,
            // set with the docsList options array  
            recursive: docsDir.recursive,
        }



        // renders files from multiple sources, skips bottom section since inputFolders are used
        if (docsDir.inputStructure === "customUrls") { renderCustomUrls(docsDir, tocData); continue }
        else if (docsDir.inputStructure === "urls") { renderUrls(docsDir, tocData); continue }







        // gets all contents in current dir
        let docsDirContents = readdirSync(docsDir.inputFolder, options)
        // sets up full paths, needed for generating file and dir books 
        docsDirContents.forEach(file => file.fullPath = path.join(file.parentPath, file.name))

        // // this is for gathering the tocData not used in main function
        // console.log(
        //     docsDirContents
        // )
        // console.log(
        //     docsDirContents
        //         .filter(content => content.isFile() && docsDir.inputType.includes(path.extname(content.name)))
        //         .map(file => path.join(file.parentPath, file.name))
        //         .join("\n")
        // )

        // throw new Error("dfsg")

        // render as BookCustom
        if (docsDir.inputStructure === "custom") { renderCustom(docsDir, docsDirContents, tocData) }
        // render entire directory as Book
        else if (docsDir.inputStructure === "full") { renderFullDir(docsDir, docsDirContents) }
        // for book per sub dir
        else if (docsDir.inputStructure === "subdir") { renderSubDir(docsDir, docsDirContents) }
        // renders a book for each file in the docsDir
        else if (docsDir.inputStructure === "files") { renderFiles(docsDir, docsDirContents) }
    }


}