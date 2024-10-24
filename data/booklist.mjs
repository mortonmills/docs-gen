
import { homedir } from 'node:os';
import { tocData } from "./data/toc-data.mjs";
import { presets } from "./data/pandoc-data.mjs";


export { bookList }



let bookList = {
    urlTest: {
        inputFiles: tocData["testUrls"],
        inputStructure: "customUrls",

        preset: presets["web"],
        outputFolder: `${homedir()}/Documents/dist-books/testUrls`,
        outputFileName: "pandoc",
        outputType: "html",

    },


    pandoc: {
        inputFolder: `${homedir()}/Documents/repo-books/pandoc-main`,
        inputFiles: tocData["pandoc"],
        inputStructure: "custom",
        inputType: [".md", ".txt"],
        recursive: true,

        preset: "embed",
        outputFolder: `${homedir()}/Documents/dist-books/pandoc-main2`,
        outputFileName: "pandoc",
        outputType: "html",
    },


    craftInt: {
        inputFolder: `${homedir()}/Documents/repo-books/craftinginterpreters-master/site`,
        inputFiles: tocData["crafting-interpreters"],
        inputStructure: "custom",
        inputType: [".html"],
        recursive: false,

        preset: "craft-int",
        outputFolder: `${homedir()}/Documents/dist-books/crafting-interpreters-site`,
        outputFileName: "craft-int",
        outputType: "html",
    },


    defSrc: {
        inputFolder: `${homedir()}/def/packages/def-compiler/src`,
        // inputFiles: tocData["def"],
        inputStructure: "subdir",
        inputType: [".js"],
        recursive: true,

        preset: "src",
        outputFolder: `${homedir()}/Documents/dist-books/fed-src2`,
        outputFileName: "fed",
        outputType: "html",
    },


    defDocs: {
        inputFolder: `${homedir()}/def/packages/docs`,
        // inputFiles: tocData["def"],
        inputStructure: "subdir",
        inputType: [".md"],
        recursive: true,

        preset: "gfm",
        outputFolder: `${homedir()}/Documents/dist-books/test-docs`,
        outputFileName: "fed",
        outputType: "html",
    },

}

