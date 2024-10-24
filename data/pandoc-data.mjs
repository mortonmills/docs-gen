export { presets, optionsArray }

import { homedir } from "node:os"
import path from "node:path"
import { isObject } from "../node/docs-list-util.mjs"



let presets = {
    // --toc --embed-resources --split-level=2 --metadata title=${title}`.split(/ +/)
    "basic": {
        toc: true,
        "embed-resources": false,
        "split-level": 2,
        standalone: true,
    },
    "embed": {
        toc: true,
        "embed-resources": true,
        "split-level": 2,
        standalone: true,
    },

    "arr": [`
--toc
--embed-resources
--no-highlight
--standalone`
    ],
    "craft-int": {
        toc: true,
        "embed-resources": true,
        "split-level": 2,
        standalone: true,
    },
    "gfm": {
        toc: true,
        "embed-resources": true,
        "split-level": 2,
        standalone: true,
        // input: "markdown+alerts"
    },
    "src": {
        toc: true,
        "embed-resources": true,
        "split-level": 2,
        standalone: true,
        srcCodeReader: true,
    },
    "web": {
        toc: true,
        "embed-resources": false,
        "split-level": 2,
        standalone: true,
        readerHtml: true,
    },
}

// thisobject is needed for folder renders
let pandocMap = {
    "toc": "--toc",
    "embed-resources": "--embed-resources",
    "no-highlight": "--no-highlight",
    "standalone": "-s",

    // output: fileName => `-o ${fileName}`,
    "split-level": ({ value: splitDepth }) => `--split-level=${splitDepth}`, //`--split-level=2,

    // "metadata title": title => `--metadata title=${title}`,
    "input": ({ value: type }) => `-f ${type}`,

    "title": ({ outputFileName }) => {
        let title = path.parse(outputFileName);
        return `--metadata title=${path.parse(title.name)}`
    },

    "resource-path": ({ docsDir }) => `--resource-path ${docsDir.fullPath}`,

    // this section uses files add other features to the output  
    "srcCodeReader": `--from ${homedir()}/src-code.lua`,
    "filter": `--lua-filter ${homedir()}/removeCode.lua`,
    "styleSheet": `--css=${homedir()}/epub.css`,
    "noScroll": `--include-in-header=${homedir()}/no-scroll-html.html`,
    "readerHtml": `--from ${homedir()}/html-filter.lua`,

}



function optionsArray(inputFileNames, docsDir, outputFileName) {


    // this contains the command line options for node child process
    let pandocArray = []
    // this has the selected options for the book
    // pandocData[espeak-ng][html].pandocOptions
    // there should be a default preset used, optional chaining is there if code is moved
    let renderOptions = docsDir?.preset
    if (renderOptions) {

        if (Array.isArray(renderOptions)) {
            pandocArray = renderOptions.map(optionString => {
                optionString
                    .split(/\s+/)
                    .filter(x => x)
            })

        }

        else if (isObject(renderOptions)) {

            // this searches through the rendering options for that book
            for (const key in renderOptions) {
                const value = renderOptions[key];
                // if the options has a truthy value, 
                // then push the string version to the options array   
                // both arrays and strings are pushed and array will be flattened  
                if (value) {
                    if (typeof pandocMap[key] === "function") {

                        // creates an optionsObj to pass in function for destruture
                        // avoids having to use order of function arguments
                        let optionsObj = { value, docsDir, outputFileName }
                        // gets the method
                        let method = pandocMap[key]
                        // passes the option's value for that method
                        let methodResult = method(optionsObj)
                        // split the result into an array separated by spaces
                        let strArr = methodResult.split(/ +/)
                        // push the returned string to the the pandoc array  
                        pandocArray.push(strArr)
                    }
                    else {
                        // split the result into an array separated by spaces
                        let strArr = pandocMap[key].split(/ +/)
                        // push the returned string to the the pandoc array  
                        pandocArray.push(strArr)
                    }

                }
            }
        }

    }


    // flatten all subarrays 
    // since each value needs to be separated by spaces 
    // for node child process
    pandocArray = pandocArray.flat()

    // docsDir.outputFileName
    // let title = path.parse(outputFileName)
    let listArgs = [
        ...inputFileNames, // input spreading array
        ...pandocArray, // options 
        // `--metadata`, `title=${title.name}`,
        // "--resource-path", `${docsDir.fullPath}`,
        "-o", outputFileName // output
    ]


    return listArgs

}







