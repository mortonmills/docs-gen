# docs-gen

The docs-gen repo is a document generator which uses nodejs to structure files 
and pandoc to render them.


The entry point is passing an **Array of options** called a docsList to the docsGen function.

the docsGen function follows this sequence
- setup options
- prep defaults
- inputStructure sort
- convert filepaths to absolute paths
- filter out non-existent paths
- render with pandoc


Options are primarily an input and output
- folder
- filename
- file extension

The other options are
- recursive



## Input Structure

There are 2 ways to generate docs
- folder/directory
- files


|       | Folder | Files |
| ----- | ------ | ----- |
| full  |        |       |
| sub   |        |       |
| files |        |       |


A path to a folder can be given and files within that folder will be converted.
A list of files can also been given, either as an array or object (also called the **"toc"**)


There are 6 ways to structure the output.
- fullfolder - the entire folder will be one document
- subfolder - each sub folder will be one document (the top level folder will also become one document)
- filesfolder - each file will be one document
- 
- fullfiles - the entire list of files will be one document
- subfiles - each key in the toc object will be one document  
- filesfiles - each file in the list will be a document

// node api
//     os freemem totalmem homedir userinfo tmpdir
//     path use dirname
//     process.env memusage resource usage and uptime
//     fs.glob mkdir.recursive readdir realpath 
//         remove.recursive watch save process create write stream and stat 

## Rendering Options
presets can either be an object or array of strings representing pandoc arguments
the strings will be separated and split by spaces


If the value of a key is a function, 
then another object containing the inputFileNames, docsDir, and outfileName will passed to that function.
Otherwise the value should be a String.

Objects are useful when the value is not known and so a function can be used at runtime.
File names in a directory can be used for the title of the document generated

## Structuring Options


## Options

Book Options have several keys
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
        inputStructure: "full",
        inputType: [".md", ".txt"],
        recursive: true,
        inputFiles: ["filepath1\nfilepath2\nfilepath3\nfilepath4"]

        preset: "embed",
        outputFolder: `${homedir()}/Documents/dist-books/pandoc-main2`,
        outputFileName: "pandoc",
        outputType: "html",
    }
```

Both Input and Out follow the format of {Folder}/{File}.{Ext}
| Column1    | inputFolder | inputExtensions | recursive | inputFiles | outputFolder | outputFileName | outputExtensions | preset |
| ---------- | :---------: | :-------------: | :-------: | :--------: | :----------: | :------------: | :--------------: | :----: |
| type       |     ""      |      []""       |   bool    |    []""    |      ""      |       ""       |        ""        |   ""   |
|            |             |                 |           |            |              |                |                  |        |
| fulldir    |      x      |        x        |     x     |            |      x       |       x        |        x         |   x    |
| subdir     |      x      |        x        |     x     |            |      x       |       x        |        x         |   x    |
| filesdir   |      x      |        x        |     x     |            |      x       |       x        |        x         |   x    |
|            |             |                 |           |            |              |                |                  |        |
| fullfiles  |      x      |                 |           |     x      |      x       |       x        |        x         |   x    |
| subfiles   |      x      |                 |           |     x      |      x       |       x        |        x         |   x    |
| filesfiles |      x      |                 |           |     x      |      x       |       x        |        x         |   x    |



Build up the docsList before passing into  


## Full Path

If using an object,
your keys should represent chapters or sections within your custom files output.

The folder name should be the top level of your inputStructure.

```
foldername
/home/pandoc

files
docs/docs.md
src/src.js

```

alternatively can be


```
foldername
/home

files
pandoc/docs/docs.md
pandoc/src/src.js

node/docs/docs.md
node/src/src.js

```


## Output Name

The **folder** and **file extension** are specified in options.
The filename is also specified but depending on the inputStructure, the filename may be different.

For full, the filename will be used.
For sub, the filename + subname will be used.
For files, the path will split and will joined with `-` as the filename