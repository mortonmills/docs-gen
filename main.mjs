import { bookList } from "./data/booklist.mjs"

import { docsGen } from "./docs-gen.mjs";
import { tocData } from "./data/toc-data.mjs";
import { presets } from "./data/pandoc-data.mjs";

import { homedir } from 'node:os';

let docsList;

// convert keys into objects mapped to an array
docsList = [
    // "pandoc", 
    // "defSrc", 
    "urlTest"
].map(docsDir => bookList[docsDir])

let zm = {
    inputFolder: `${homedir()}/Documents/repo-books/pandoc-main`,
    inputFiles: ["filepath1\nfilepath2\nfilepath3\nfilepath4", tocData[pandoc]],
    inputStructure: "full",
    inputType: [".md", ".txt"],
    recursive: true,

    preset: presets["embed"],
    outputFolder: `${homedir()}/Documents/dist-books/testOut`,
    outputFileName: "pandoc",
    outputType: "html",
}

docsList,push(zm)

docsGen(docsList)