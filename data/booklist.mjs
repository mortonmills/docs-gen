
import { homedir } from 'node:os';


export { bookList }



let bookList = {
    urlTest: {
        toc: "testUrls",
        inputStructure: "customUrls",

        preset: "web",
        outputFolder: `${homedir()}/Documents/dist-books/testUrls`,
        outputFileName: "pandoc",
        outputType: "html",

    },


    pandoc: {
        inputFolder: `${homedir()}/Documents/repo-books/pandoc-main`,
        inputStructure: "custom",
        inputType: [".md", ".txt"],
        recursive: true,

        preset: "embed",
        outputFolder: `${homedir()}/Documents/dist-books/pandoc-main2`,
        outputFileName: "pandoc",
        outputType: "html",
        toc: "pandoc",
    },


    craftInt: {
        inputFolder: `${homedir()}/Documents/repo-books/craftinginterpreters-master/site`,
        inputStructure: "custom",
        inputType: [".html"],
        recursive: false,

        preset: "craft-int",
        outputFolder: `${homedir()}/Documents/dist-books/crafting-interpreters-site`,
        outputFileName: "craft-int",
        outputType: "html",
        toc: "crafting-interpreters",
    },


    defSrc: {
        inputFolder: `${homedir()}/def/packages/def-compiler/src`,
        inputStructure: "subdir",
        inputType: [".js"],
        recursive: true,

        preset: "src",
        outputFolder: `${homedir()}/Documents/dist-books/fed-src2`,
        outputFileName: "fed",
        outputType: "html",
        // toc: "def",
    },


    defDocs: {
        inputFolder: `${homedir()}/def/packages/docs`,
        inputStructure: "subdir",
        inputType: [".md"],
        recursive: true,

        preset: "gfm",
        outputFolder: `${homedir()}/Documents/dist-books/test-docs`,
        outputFileName: "fed",
        outputType: "html",
        // toc: "def",
    },

}

