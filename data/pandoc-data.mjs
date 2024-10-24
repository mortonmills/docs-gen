export { presets, optionsArray }

import { homedir } from "node:os"
import path from "node:path"



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
--standalone`,

        {
            readerHtml: pandocMap["readerHtml"],
            title: pandocMap["title"],
        }

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
        readerHtml: pandocMap["readerHtml"],
        title: pandocMap["title"],
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



