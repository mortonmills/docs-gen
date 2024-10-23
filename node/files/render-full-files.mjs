
import { URL } from 'node:url';
import { isObject, pandocRender, filterFileNamesExist, convertToFullPath } from "../docs-list-util.mjs"
export { renderFullFiles }


// this module contains rendering for both fullfiles and filesfiles

function renderFullFiles(docsDir) {

    let inputFileNames = genInputFileNames(docsDir)


    if (docsDir.inputStructure === "filesfiles") {

        inputFileNames.forEach(inputFileName => {

            // this renames the file for the outputFileName
            let outputName = convertOutputFileName(inputFileName)
            //                    /home/books-dist/ bookname.  html
            let outputFileName = `${docsDir.outputFolder}/${outputName}.${docsDir.outputType}`

            pandocRender(inputFileName, docsDir, outputFileName)

        });

    }
    else if (docsDir.inputStructure === "fullfiles") {

        //                    /home/books-dist/ bookname.  html
        let outputFileName = `${docsDir.outputFolder}/${docsDir.outputFileName}.${docsDir.outputType}`

        pandocRender(inputFileNames, docsDir, outputFileName)

    }


}





function genInputFileNames(docsDir) {


    let inputFileNames;

    if (Array.isArray(docsDir.inputFiles)) {
        // convert strings of filepaths into arrays 
        inputFileNames = docsDir.inputFiles.map(fileStrings => convertToFullPath(fileStrings, docsDir))
    }
    else if (isObject(docsDir.inputFiles)) {

        let toc = docsDir.inputFiles
        inputFileNames = []
        for (const key in toc) {
            const value = toc[key];

            let fileNames = convertToFullPath(value, docsDir)
            inputFileNames.push(fileNames)
        }

    }

    // convert array of arrays to one array
    inputFileNames = inputFileNames.flat()

    inputFileNames = filterFileNamesExist(inputFileNames)

    return inputFileNames

}


function convertOutputFileName(inputFileName) {

    let testurl = new URL(`${inputFileName}`)
    let pathName = testurl.pathname
    // let parsedPath = path.parse(pathName)
    let outputFileName = pathName.split("/").filter(el => el)
    let nameIndex = outputFileName.length
    outputFileName =
        outputFileName[nameIndex - 2]
            ? outputFileName[nameIndex - 2] + "-" + outputFileName[nameIndex - 1]
            : outputFileName[nameIndex - 1]
                .join("-")

    return outputFileName


}