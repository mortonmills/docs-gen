# docs-gen
The docs-gen repo is document generator which uses nodejs to arrange files 
and pandoc to generate them.

There are 2 ways to generate docs
- folder/directory
- files


|       | Folder | Files |
| ----- | ------ | ----- |
| full  |        |       |
| sub   |        |       |
| files |        |       |


A path to a folder can be given and the files within that folder will be converted.
There are 3 ways to structure the output.
- full - the entire folder will be one document
- sub dir - each sub folder will be one document including the top level folder
- files - each file will be one document

Book Options requires several keys
- inputFolder: String containing fullpath of input folder, folder is source material docs generated
- inputFiles: Array[] containing Strings containing a path or paths, 
  - can be used in conjuction with inputFolder, as a parent path for paths specified
- toc: Object containing keys which represent sub dir and their values which is a String that contains paths
  - can be used in conjuction with inputFolder, as a parent path for paths specified

- inputType: Array[] of any file extension
- inputStructure: String, custom, full, subdir, files, urls
- use urls when you aren't needing files associated with any directory
- urls allow you to mix files and webpages together from different sources
- recursive: Boolean true, false

- outputFolder: String containing fullpath of output folder,
- outputFileName: String containing name of output filename,
- outputType: String file extension of output filename "html" not ".html",
- preset: String, name of preset in presets object, ex, "src", 

```javascript

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
    }
```

install readability and change lua filter for local npm
install node pandoc filter

setup repo with packages

destructure prep
files names arrays then flat() full and single files
optional parentpath

options to be arrays
possible merge of custom
list resource path as array and convert for pandoc
test all inputStructures 
add pandoc web filter in package json
TODO LOW PRIORITY
should use naming that embeds "/" or "\" as platform specific separators
names should be joined as path, 
applies to input files/folders and output files and folders
separate "/" then rejoin to make compatbile with platform 
