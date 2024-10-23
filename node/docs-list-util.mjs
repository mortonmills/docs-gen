
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

export { docsListPrep, showDirFilesList, isObject, pandocRender }


function docsListPrep(docsList) {

    // checks for required keys in docsList, 
    // supplies defaults if keys are missing
    let docsList2 = []
    for (const oldDocsDir of docsList) {

        let docsDir = structuredClone(oldDocsDir)


        // let r = {
        //     inputFolder: `${homedir()}/Documents/repo-books/pandoc-main`,
        //     inputStructure: "custom",
        //     inputType: [".md", ".txt"],
        //     recursive: true,

        //     preset: "embed",
        //     outputFolder: `${homedir()}/Documents/dist-books/pandoc-main2`,
        //     outputFileName: "pandoc",
        //     outputType: "html",
        //     toc: "pandoc",

        // }

        // for generating docs form multiple sources, "urls" does not follow same output as other options
        if (docsDir.inputStructure === "customUrls" || docsDir.inputStructure === "urls") {
            docsList2.push(docsDir)
            continue
        }




        // inputFolder is required, error
        docsDir.inputFolder = docsDir.inputFolder ?? undefined
        if (docsDir.inputFolder === undefined) { throw new Error(`An "inputFolder" value is required.`) }
        // fullpath is needed for other functions, subDir needs for treating top level dir as subdir 
        docsDir.fullPath = docsDir.inputFolder

        // if "custom" but no "toc" key given, throw error
        docsDir.toc = docsDir.toc ?? undefined
        if (docsDir.inputStructure === "custom" && docsDir.toc == undefined) { throw new Error(`A "toc" value is required for a "custom" inputStructure.`) }

        // recursive should be false
        docsDir.recursive = docsDir.recursive ?? false
        // inputType missing, then all files types are used
        docsDir.inputType = docsDir.inputType ?? [".md"]
        // inputStructure missing, then full
        docsDir.inputStructure = docsDir.inputStructure ?? "full"




        // outputFolder, dist in the current dir,
        docsDir.outputFolder = docsDir.outputFolder ?? path.resolve(`./dist`)
        // outputFileName, same name as inputFolder
        docsDir.outputFileName = docsDir.outputFileName ?? `${docsDir.inputFolder.split(path.sep).join("-")}`
        // outputType, html
        docsDir.outputType = docsDir.outputType ?? "html"
        // preset, basic, 
        docsDir.preset = docsDir.preset ?? "basic"

        docsList2.push(docsDir)

    }






    // this checks to see if the inputFolder exists
    // filter any that do not
    docsList = docsList2.filter(docsDir => {

        // accounts for "inputStructure": "urls" which will not have an "inputFolder" 
        if (docsDir.inputStructure === "customUrls"
            || docsDir.inputStructure === "urls") {
            return true
        }
        // since using filter method, will return true, 
        // checks if path exists and is a directory
        // node documentation recommends trying to read then handling error,
        // when checking if is directory, using readdirSync here for directories
        // search for "check for" in node docs
        try { return readdirSync(docsDir.inputFolder) }
        catch { return false }
    })

    // for inputFolders that do not throw errors
    // create the outputFolders for those Books in docsList
    docsList.forEach(option => {
        if (!existsSync(option.outputFolder)) {
            // will create parent folders also
            mkdirSync(option.outputFolder, { recursive: true })
        }
    })

    return docsList

}




function showDirFilesList(docsList) {


    for (const docsDir of docsList) {

        let options = {
            // creates dirEnt from node readDirSync
            withFileTypes: true,
            // set with the docsList options array  
            recursive: docsDir.recursive,
        }


        // this is for gathering the tocData not used in main function
        // gets all contents in current dir
        let docsDirContents = readdirSync(docsDir.inputFolder, options)
        // sets up full paths, needed for generating file and dir books 
        docsDirContents.forEach(file => file.fullPath = path.join(file.parentPath, file.name))

        // console.log(
        //     docsDirContents
        // )

        console.log(
            docsDirContents
                .filter(content => content.isFile() && docsDir.inputType.includes(path.extname(content.name)))
                .map(file => path.join(file.parentPath, file.name))
                .join("\n")
        )

    }

    throw new Error("dfsg")


}




function isObject(obj) {
    return typeof obj === "object"
        && obj !== null
        && !Array.isArray(obj)
}



function pandocRender(listArgs){

    let soxMergeTrackVoices = spawnSync("pandoc", listArgs)
    if (soxMergeTrackVoices.stderr.length !== 0) {
        console.log(`soxMergeTrackVoices:`, `${soxMergeTrackVoices.stderr}`)
    }



}