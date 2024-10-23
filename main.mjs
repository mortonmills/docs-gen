import { tocData } from "./data/toc-data.mjs";
import { bookList } from "./data/booklist.mjs"

import { docsGen } from "./docs-gen.mjs";
import { homedir } from 'node:os';

let docsList;

// docsList = [
//     {
//         toc: "oneTest",
//         inputStructure: "urls",

//         preset: "web",
//         outputFolder: `${homedir()}/Documents/dist-books/testUrls`,
//         outputFileName: "pandoc",
//         outputType: "html",

//     },
// ]

// tocData = {
//     oneTest: {
//         docs: `
// doc/custom-readers.md
// doc/custom-writers.md
// doc/customizing-pandoc.md
// `,
//     }

// }

// test inputFiles
[
    tocData["espeak"]["main"], 
    tocData["espeak"]["phonemes"], 
    tocData["espeak"]["languages"],
]


// convert keys into objects mapped to an array
docsList = [
    // "pandoc", 
    // "defSrc", 
    "urlTest"
].map(docsDir => bookList[docsDir])

docsGen(docsList, tocData)